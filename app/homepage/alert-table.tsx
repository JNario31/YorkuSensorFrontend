import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AlertTable(){
    return(<Table>
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
            
        </TableBody>
    </Table>);
}