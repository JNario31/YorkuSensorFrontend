import { CheckCircle, OctagonAlert } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"

interface SensorStatusProps {
  sensor: Sensor
}

interface SensorData {
  temperature?: number
  humidity?: number
  airflow?: number
  pressure?: number
}

export default function SensorStatus({ sensor }: SensorStatusProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState<number | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000"
    console.log(`Using socket URL: ${socketUrl}`)

    const socket = io(socketUrl)
    socketRef.current = socket

    socket.on("connect", () => {
      console.log("Socket connected")
      setIsConnected(true)
    })

    socket.on("disconnect", () => {
      console.log("Socket disconnected")
      setIsConnected(false)
    })

    socket.on("sensor_update", (update) => {
        //console.log("Received sensor_update:", update.data.id);
        console.log(sensor.id)
        if (update.status_code === 200 && Number(update.data?.id) === sensor.id) {
          console.log("Received update for this sensor:", update.data);
          setLastSeen(Date.now());
          setIsOnline(true);
        }
      });

    // Mark offline if no update for 10 seconds
    const interval = setInterval(() => {
        if (lastSeen && Date.now() - lastSeen > 10000) {
          setIsOnline(false);
        }
      }, 10000); // Check every 10s

      return () => {
        console.log("Cleaning up socket connection");
        socket.off("connect");
        socket.off("disconnect");
        socket.off("sensor_update");
        socket.disconnect();
        clearInterval(interval);
      };
  }, [sensor.id, lastSeen]) // Only reconnect when `sensor.id or lastSeen` changes

  

  
  return (
    <div className="flex items-center space-x-2">
      <span className="font-medium">{sensor.name}:</span>
      <span className={`text-sm ${isOnline ? "text-green-700" : "text-red-700"}`}>
        {isOnline ? "Online" : "Offline"}
      </span>
      {isOnline ? (
        <CheckCircle className="text-green-500 w-3 h-3"/>
      ) : (
        <OctagonAlert className="text-red-500 w-3 h-3" />
      )}
    </div>
  );
}
