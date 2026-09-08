# 状態ユニオンと遷移シグネチャを設計原則へ昇格する検討

KAKEHASHI Tech Blog「サーバサイド TypeScript を選んで嬉しかったこと」（[記事](https://kakehashi-dev.hatenablog.com/entry/2026/07/08/090000)）を元に、api-server の設計・実装ワークフローに取り込む点と取り込まない点を整理し、artistProfiles で検証実装した。

**位置づけ**: 検討中（`discussions/`）。検証実装の規範部分は `docs/architecture/server/architecture.md`「主体の状態も同じ形で解決する（プロフィール）」へ書いた。

---

## 結論

- 記事の主張のうち 3 つは api-server が既に実装済みで、権能モデルは記事より厳密である
- 整えるべきはコードではなく、**既に個別事例として持っている「状態はユニオン、遷移は関数シグネチャ」を設計原則として docs と Skill の手順に昇格させること**
- ドメインイベントの共通化は現時点では対象外。ArtistProfile の公開状態のユニオン化は第 3 の状態が生まれるまで見送る

## 記事の主張と api-server の対応

| 記事の主張                             | api-server の現状                                                         | 判定                   |
| -------------------------------------- | ------------------------------------------------------------------------- | ---------------------- |
| Discriminated Union でフロー状態を表す | `ActorResolution` が 3 状態ユニオン。`switch` の網羅性は戻り値型で担保    | 実装済み               |
| 関数シグネチャで遷移を表す             | `toAddressedActor: ActorResolution → Result<Actor, ResolveActorError>` 等 | 実装済み               |
| 構造的型で括りを使う側が定義する       | 権能モデル。usecase ごとに `Pick` で束ね、lint で迂回を落とす             | 記事より厳密           |
| OIDC と SSR                            | 認証は Auth0 に委譲。自前の認可サーバを持たない                           | 対象外                 |
| ドメインイベントの共通化               | 仕組み無し。`artistHandleHistories` が単一集約向けの手書き履歴            | 検討候補（今ではない） |
| 似ているだけのロジックは個別に書く     | `code-review-checklist.md` §6-1 と同じ思想                                | 一致                   |

取り込まない点: 記事は `Result` の失敗側に「次の画面」を載せるが、本プロジェクトは失敗側をルール違反に限定する（`error-handling/concepts.md`）。分岐先は成功側の状態ユニオンで表す。

## 線引き（usecase / 解決 / policy）

| 問い                                                 | 答え   | 置き場                                              |
| ---------------------------------------------------- | ------ | --------------------------------------------------- |
| 操作の前に「主体がどの状態か」の判定か               | はい   | 解決（`resolveXxxState` + `resolution` の畳み込み） |
| 同じ主体への同じ前提が 2 つ以上の usecase に現れるか | いいえ | その usecase の `err` に残す                        |
| 畳み方が usecase ごとに違うか                        | はい   | ユニオンは共有、畳み込み関数を用途ごとに分ける      |
| 判定に主体以外の I/O が要るか                        | はい   | usecase か domain service（解決には入れない）       |
| 操作の後に守られるべき条件か                         | はい   | domain policy                                       |

越えた信号: 解決モジュールに業務ルールが入り始めたら寄せすぎ。usecase に自分の主体への `if (!x) return err(NotFound)` が残っていたら寄せ足りない。汎用の状態機械基盤を書きたくなったら抽象化しすぎ。

## 検証実装（artistProfiles）

前提の重複: 編集系 5 usecase が `loadOrDraftMyProfile`（無ければ下書き）を各自呼び、`publishMyProfile` が自前で `findByArtistId` → 404、`getMyProfile` が自前で null、と 3 通りの扱いが usecase 内に埋まっていた。

| 変更         | 内容                                                                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 状態ユニオン | `ProfileResolution = noProfile \| existing`（draft / published は Entity の `isPublished()` が持つため重複させない）                                               |
| 解決         | `infrastructure/capabilities/resolveProfileState`。境界の中で解決するため `runInTransaction` の組み立てを非同期許容に                                              |
| 畳み込み     | `resolution` に `toEditableProfile`（下書きに昇格）/ `toExistingProfile`（404 に畳む）                                                                             |
| 経路         | `artistProfileEdit` / `artistProfilePublish` の 2 本。`ArtistWriteCapabilities` から `artistProfiles` を外す                                                       |
| 権能         | `ArtistProfileWriteCapabilities = { actor, profile, artistProfiles: Writer }`。Reader を載せないので usecase は有無を判定できない                                  |
| usecase      | 編集系 5 本は `caps.profile` を受け取るだけ（`actor` 不要）。`publishMyProfile` の Error から `ArtistProfileNotFoundError` が消える。`loadOrDraftMyProfile` は削除 |
| lint         | `local/usecase-subject-not-found`: `create*NotFoundError` の値 import を `resolution` 以外で禁止                                                                   |

検証結果: api-server の test 637 件 green、`tsc` エラー 0、lint エラー 0、knip / knip:production 検出 0。

判断した点（規範に無く暫定で決めたこと）:

- `ProfileResolution` を 2 状態にした。3 状態（draft / published）にすると Entity の `published` と二重の真実になる
- 解決を境界の中で行う。編集は読み書きが同一トランザクションに乗る（従来の `loadOrDraftMyProfile` と同じ整合性）
- 公開経路は `noProfile` を境界の中で `err` に畳む。境界を張った直後に返るだけで書き込みは無い
- `getPublicProfile` の NotFound 生成は lint の暫定除外。handle による解決の経路が 2 本目になったら `resolution` へ移す
- `getMyProfile` は今回触っていない。出力を `kind` ユニオンにする案は BFF 契約の変更を伴うため別 PR

## 次のアクション

1. `api-server-feature` Skill の Step 3 先頭に「状態が 2 つ以上あるなら、状態ユニオンと遷移シグネチャを型だけで先に書く」を追加する
2. `flow-design.md` にプロフィールの段階（未作成 → 下書き → 公開可能 → 公開中）の状態遷移図を置き、コンセプト等のゲート有無を決める
3. entrypoint テストを本番の結線（`getCapabilityDeps`）で回す（`refactoring-safety-net.md` 提案 1）
