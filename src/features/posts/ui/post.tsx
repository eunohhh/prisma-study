"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PostProps {
  id: number;
  itemNo: number;
  title: string;
  url: string;
  votes: number;
}

export const Post = ({ itemNo, title, url, votes, id }: PostProps) => {
  useEffect(() => {}, [votes]);

  const [vote, controlVote] = useState<number>(votes);

  const increaseVotes = async () => {
    try {
      controlVote((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Badge variant="secondary" className="flex-shrink-0">
            {itemNo}
          </Badge>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={increaseVotes}
                className="h-6 w-6 p-0 hover:bg-green-100"
              >
                ▲
              </Button>
              <span className="font-medium">{title}</span>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src={url}
                alt={title}
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{vote} points</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
