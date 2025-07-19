"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadThingButton from "@/components/ui/upload-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreatePostMutation } from "../queries";
import { postFormSchema } from "../schema";
import { PostFormValues } from "../types";

export const PostForm = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      url: "",
      content: "",
    },
  });

  const { mutate: createPost, isPending, error } = useCreatePostMutation();

  const onSubmit = (data: PostFormValues) => {
    if (!imageUrl) {
      alert("이미지를 먼저 업로드 해주세요");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("url", imageUrl);
    formData.append("content", data.content);

    // TODO: API 호출 로직 추가
    createPost(formData);
  };

  const handleUploadComplete = (url: string) => {
    form.setValue("url", url);
    setImageUrl(url);
  };

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>새 포스트 작성</CardTitle>
      </CardHeader>
      <CardContent>
        <UploadThingButton onUploadComplete={handleUploadComplete} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input placeholder="포스트 제목을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>내용</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="포스트 내용을 입력하세요"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              포스트 작성
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
