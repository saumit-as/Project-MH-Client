"use client";
import { getDiaryData, saveDiaryData } from "@/action";
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
import { useRef, useState } from "react";
import markdownToTxt from "markdown-to-txt";

import { ScrollArea } from "../ui/scroll-area";
import OpenAI from "openai";
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

  const getAdvice = async (promt: string) => {
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          content: `The following is my diary entry of today. please read the contents and tell me ways to improve my life as a friend is telling to me. Also don't complete the sentences just give advice. Don't give in points just give me in paragraphs. Keep the advice in 5 lines. ${promt}`,
          role: "user",
        },
      ],
      temperature: 0.7,
      stream: true,
    });

    let txt = "";
    for await (const chunk of res) {
      txt += chunk.choices[0].delta.content ?? "";
      setLoading(false);
      setAdvice(txt); // Process and accumulate data from the stream
    }

    return txt;
  };

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
                  // getAdvice(data);
                  const diaryData: DairyData = {
                    key: email + new Date(date || new Date()).toDateString(),
                    data: ref.current?.getMarkdown() || "",
                    advice: gpt ?? "",
                  };
                  await saveDiaryData(diaryData);

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
