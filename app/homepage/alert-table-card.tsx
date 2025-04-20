import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import AlertTableItems from "./alert-table";

export default function AlertTableCard(){
    const [timeRange, setTimeRange] = useState("1h");

    return(<>
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
    <Table>    
        <TableCaption>Most Recent Alert Notifications</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">Building</TableHead>
                <TableHead>Sensor</TableHead>
                <TableHead>Alert Type</TableHead>
                <TableHead className="text-right">Date</TableHead>
                <TableHead className="text-right">Value</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <AlertTableItems timeRange={timeRange}/>
        </TableBody>
        <TableBody>
            
        </TableBody>
    </Table>
    </>
    );
}