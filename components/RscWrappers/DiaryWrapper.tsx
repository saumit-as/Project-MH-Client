"use client";
import { getAdvice, getDiaryData, getEmotion, saveDiaryData } from "@/action";
import { DiaryEntry } from "@/components/DiaryEntry";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { DairyData } from "@/types";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { useEffect, useRef, useState } from "react";
import markdownToTxt from "markdown-to-txt";
import { Chat } from "../chat";
import { nanoid } from "@/lib/utils";
import { useChat } from "ai/react";
import { ScrollArea } from "../ui/scroll-area";
export const DiaryWrapper = ({
  email,
  initialDate,
}: {
  email: string;
  initialDate: DairyData;
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const ref = useRef<MDXEditorMethods>(null);
  const props = { something: initialDate.data };
  const [advice, setAdvice] = useState(initialDate.advice ?? "");
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-background mt-5 text-black  rounded-xl border-8">
      <ResizablePanelGroup
        direction="horizontal"
        className=" rounded-lg border"
      >
        <ResizablePanel defaultSize={40}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={async (d) => {
                    setDate(d);
                    const data = await getDiaryData({
                      key: email + new Date(d || new Date()).toDateString(),
                    });
                    ref.current?.setMarkdown(data.data);
                    setAdvice(data.advice);
                  }}
                  className="rounded-md border"
                />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                {!loading ? (
                  <ScrollArea className="h-72 p-5 rounded-md border ">
                    <span className="block font-semibold">
                      A Note to remember
                    </span>
                    {advice}
                  </ScrollArea>
                ) : (
                  <div>loading</div>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60}>
          <div className="h-[800px] w-full p-5 flex flex-col gap-2">
            <div className="flex justify-between">
              <span>{new Date(date || new Date()).toDateString()}</span>
              <Button
                onClick={async () => {
                  setLoading(true);
                  const data = markdownToTxt(ref.current?.getMarkdown() || "");
                  const gpt = !advice ? await getAdvice(data) : advice;
                  const diaryData: DairyData = {
                    key: email + new Date(date || new Date()).toDateString(),
                    data: ref.current?.getMarkdown() || "",
                    advice: gpt ?? "",
                  };
                  await saveDiaryData(diaryData);
                  if (gpt) setAdvice(gpt);
                  setLoading(false);
                }}
              >
                Save
              </Button>
            </div>
            <DiaryEntry {...props} ref={ref} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
