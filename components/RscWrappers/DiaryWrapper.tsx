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
import { useEffect, useRef, useState } from "react";

export const DiaryWrapper = ({
  email,
  initialDate,
}: {
  email: string;
  initialDate: string;
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const ref = useRef<MDXEditorMethods>(null);
  const props = { something: initialDate };

  return (
    <div className="container">
      <ResizablePanelGroup
        direction="horizontal"
        className=" rounded-lg border"
      >
        <ResizablePanel defaultSize={40}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70}>
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
                  }}
                  className="rounded-md border"
                />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={30}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60}>
          <div className="h-[800px] w-full p-2 flex flex-col gap-2">
            <div className="flex justify-between">
              <span>{new Date(date || new Date()).toDateString()}</span>
              <Button
                onClick={async () => {
                  const diaryData: DairyData = {
                    key: email + new Date(date || new Date()).toDateString(),
                    data: ref.current?.getMarkdown() || "",
                  };
                  await saveDiaryData(diaryData);
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
