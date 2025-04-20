import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSocket } from "@/hooks/useSockets";
import { useEffect, useState } from "react";
import { toast } from "sonner";
interface Alert{
    timestamp: string,
    alert_type: string,
    value: number,
}

interface AlertTableItemsProps {
    timeRange: string,
}
export default function AlertTableItems({timeRange}: AlertTableItemsProps){
    const socket = useSocket();
    const [alerts, setAlerts] = useState<(Alert)[]>([])


    useEffect(() => {
        if (!socket) return;
    
        socket.emit("get_alert_data", {
            time_range: timeRange, // No filter for all-time
          });
        // Listen for real-time updates
        socket.on("surpassed_threshold", (update) => {
            console.log("Received alert update:", update)
    
            if (update.status_code === 200 && update.data) {

            toast(`${update.data.alert_type}: ${update.data.value}`, {
                description: new Date(update.data.timestamp).toLocaleString(),
                })

            setAlerts((prevData) => {
                const updatedData = [...prevData, update.data]
                return updatedData
            })
            }
        })
        
        // Listen for get_alert_data response
        socket.on("alert_data", (response) => {
            console.log("Received get_alert_data response:", response)
        
            if (response.status_code === 200 && response.data) {
                setAlerts(response.data)
            } 

            })
        return () => {
            socket.off("surpassed_threshold");
            socket.off("get_alert_data");
            socket.off("alert_data")
        };
        }, [socket, timeRange]);

    return(
        <>
        
        {alerts.map((alert) => (
            <TableRow key={alert.timestamp}>
            <TableCell>{}</TableCell>
            <TableCell>{}</TableCell>
            <TableCell>{alert.alert_type}</TableCell>
            <TableCell className="text-right">
                {new Date(alert.timestamp).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                })}
            </TableCell>
            <TableCell className="text-right">{alert.value}</TableCell>
            </TableRow>
        ))}
        </>

        );
}