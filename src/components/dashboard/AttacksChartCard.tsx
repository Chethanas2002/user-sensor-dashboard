
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the weekly attacks chart
const weeklyAttacksData = [
  { name: 'Mon', attacks: 4 },
  { name: 'Tue', attacks: 3 },
  { name: 'Wed', attacks: 7 },
  { name: 'Thu', attacks: 2 },
  { name: 'Fri', attacks: 5 },
  { name: 'Sat', attacks: 1 },
  { name: 'Sun', attacks: 2 },
];

const AttacksChartCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">Weekly Attack Attempts</CardTitle>
          <Activity className="h-5 w-5 text-gray-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyAttacksData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attacks" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttacksChartCard;
