"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SensorChart } from "./sensor-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SensorCardProps } from "@/app/library/interfaces";



export default function SensorCard({
  sensorId,
  title,
  description,
  dataKeys,
  chartConfig,
  lineColors,
}: SensorCardProps) {
  const [timeRange, setTimeRange] = useState("1h");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="flex space-x-2">
          {["1h", "24h", "7d", "30d","all-time"].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range === "1h" ? "1 Hour" : range === "24h" ? "24 Hours" : range === "7d" ? "7 Days" : range === "30d" ? "30 Days": "All-Time"}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="temperature">
          <TabsList className="mb-4">
            {dataKeys.map((key) => (
              <TabsTrigger key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          {dataKeys.map((key) => (
            <TabsContent key={key} value={key}>
              <SensorChart
                sensorId={sensorId}
                dataKey={key}
                chartConfig={chartConfig[key]} // Use the correct config
                lineColors={lineColors}
                timeRange={timeRange}
                maxDataPoints={timeRange === "all-time" ? 400 : 100}
              />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button>Download</Button>
      </CardFooter>
    </Card>
  );
}
