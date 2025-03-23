"use client";
import React from "react";
import { cn } from "../../../utils";
import AdminHeader from "./../../../components/AdminHeader";

// Button Component
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline";
    size?: "default" | "sm";
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variant === "default" && "bg-blue-500/20 hover:bg-blue-500/30 text-white",
        variant === "outline" && "bg-white/5 hover:bg-white/10 text-white border border-white/10",
        size === "default" && "h-10 px-4 py-2",
        size === "sm" && "h-8 px-3 text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// Input Component
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm",
          "text-white placeholder:text-gray-400",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// Textarea Component
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm",
        "text-white placeholder:text-gray-400",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

// Label Component
const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn("text-sm font-medium text-gray-300", className)} {...props} />
  )
);
Label.displayName = "Label";

// Card Components
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-white/10 bg-white/5 text-card-foreground shadow-sm backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight text-white", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-gray-400", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const EventRegistrationForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // フォーム送信処理
  };

  return (
    <div className="container mx-auto p-4">
      <AdminHeader />
      <Card>
        <CardHeader>
          <CardTitle>イベント登録</CardTitle>
          <CardDescription>新規イベントの登録フォーム</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 基本情報セクション */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">基本情報</h3>

              <div className="grid gap-2">
                <Label htmlFor="eventName">イベント名</Label>
                <Input id="eventName" placeholder="イベント名を入力" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="eventDate">開催日</Label>
                  <Input id="eventDate" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="capacity">定員</Label>
                  <Input id="capacity" type="number" min="1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startTime">開始時間</Label>
                  <Input id="startTime" type="time" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endTime">終了時間</Label>
                  <Input id="endTime" type="time" />
                </div>
              </div>
            </div>

            {/* 会場情報セクション */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">会場情報</h3>

              <div className="grid gap-2">
                <Label htmlFor="venue">会場名</Label>
                <Input id="venue" placeholder="会場名を入力" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address">住所</Label>
                <Input id="address" placeholder="会場の住所を入力" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="access">アクセス</Label>
                <Textarea id="access" placeholder="最寄り駅からのアクセスなど" />
              </div>
            </div>

            {/* イベント詳細セクション */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">イベント詳細</h3>

              <div className="grid gap-2">
                <Label htmlFor="description">イベント説明</Label>
                <Textarea id="description" placeholder="イベントの説明を入力" className="h-32" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="rules">ルール・注意事項</Label>
                <Textarea id="rules" placeholder="参加ルールや注意事項を入力" className="h-32" />
              </div>
            </div>

            {/* エントリー設定セクション */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">エントリー設定</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="entryStart">エントリー開始日時</Label>
                  <Input id="entryStart" type="datetime-local" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="entryEnd">エントリー締切日時</Label>
                  <Input id="entryEnd" type="datetime-local" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="entryFee">参加費</Label>
                <Input id="entryFee" type="number" min="0" placeholder="0" />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline">下書き保存</Button>
              <Button type="submit">イベントを公開</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventRegistrationForm;
