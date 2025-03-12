
import React from 'react';
import { Shield, AlertCircle, Activity, AlertTriangle } from "lucide-react";

interface ActivityIconProps {
  event: { 
    name: string, 
    status: string 
  };
}

const ActivityIcon = ({ event }: ActivityIconProps) => {
  if (event.name.includes("Check") || event.status.includes("No issues"))
    return <Shield className="h-5 w-5 text-green-600" />;
  if (event.status.includes("Quarantined") || event.status.includes("Detected"))
    return <AlertCircle className="h-5 w-5 text-red-600" />;
  if (event.status.includes("Failed"))
    return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
  return <Activity className="h-5 w-5 text-blue-600" />;
};

export default ActivityIcon;
