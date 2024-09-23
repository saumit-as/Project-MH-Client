import { Quote } from "@/types";
import React from "react";
import QuoteIcon from "./QuoteIcon";
import { getQuote } from "@/action";
import { Card, CardContent } from "./ui/card";

const Quotes = async () => {
  const quote: Quote[] = await getQuote("happiness");
  return (
    <Card>
      <CardContent>
        <div className=" px-8 py-3 rounded-xl ">
          <div className="flex justify-center mb-8">
            <QuoteIcon />
          </div>
          <div>
            <p className="text-md mb-4 text-center">{quote[0].quote}</p>
            <p className="text-sm text-center">- {quote[0].author}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Quotes;
