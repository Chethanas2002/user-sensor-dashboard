
import React, { useState, useEffect } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Check, Clock, File, Search, Download } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";

// Define the log entry type based on the CSV structure
interface LogEntry {
  timestamp: string;
  action: string;
  file_extension: string;
  process: string;
  parent_process: string;
  label: string; // "0" for safe, "1" for alert
}

const DetailedLogs = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const logsPerPage = 10;
  const { toast } = useToast();

  useEffect(() => {
    // Simulated data loading for now
    // This would be replaced with actual CSV parsing logic
    setIsLoading(true);
    
    // In a real implementation, this would fetch and parse the CSV file
    setTimeout(() => {
      const mockData: LogEntry[] = [
        {
          timestamp: "2023-07-12 14:30:45",
          action: "File created",
          file_extension: ".exe",
          process: "explorer.exe",
          parent_process: "System",
          label: "1", // alert
        },
        {
          timestamp: "2023-07-12 14:35:22",
          action: "File modified",
          file_extension: ".dll",
          process: "svchost.exe",
          parent_process: "services.exe",
          label: "0", // safe
        },
        {
          timestamp: "2023-07-12 14:40:10",
          action: "File deleted",
          file_extension: ".tmp",
          process: "chrome.exe",
          parent_process: "explorer.exe",
          label: "0", // safe
        },
        {
          timestamp: "2023-07-12 15:05:33",
          action: "Registry modified",
          file_extension: "",
          process: "unknown.exe",
          parent_process: "explorer.exe",
          label: "1", // alert
        },
        {
          timestamp: "2023-07-12 15:30:45",
          action: "File created",
          file_extension: ".doc",
          process: "winword.exe",
          parent_process: "explorer.exe",
          label: "0", // safe
        },
        {
          timestamp: "2023-07-12 16:02:18",
          action: "File accessed",
          file_extension: ".pdf",
          process: "acrobat.exe",
          parent_process: "explorer.exe",
          label: "0", // safe
        },
        {
          timestamp: "2023-07-12 16:15:40",
          action: "Network connection",
          file_extension: "",
          process: "malware.exe",
          parent_process: "unknown",
          label: "1", // alert
        },
        {
          timestamp: "2023-07-12 16:30:22",
          action: "File modified",
          file_extension: ".js",
          process: "node.exe",
          parent_process: "cmd.exe",
          label: "0", // safe
        },
        {
          timestamp: "2023-07-12 17:05:11",
          action: "File created",
          file_extension: ".bat",
          process: "cmd.exe",
          parent_process: "explorer.exe",
          label: "1", // alert
        },
        {
          timestamp: "2023-07-12 17:20:33",
          action: "Process started",
          file_extension: ".exe",
          process: "powershell.exe",
          parent_process: "explorer.exe",
          label: "0", // safe
        },
        {
          timestamp: "2023-07-12 17:45:19",
          action: "File accessed",
          file_extension: ".sys",
          process: "system",
          parent_process: "",
          label: "0", // safe
        },
        {
          timestamp: "2023-07-12 18:10:05",
          action: "Registry accessed",
          file_extension: "",
          process: "regedit.exe",
          parent_process: "explorer.exe",
          label: "0", // safe
        },
      ];
      
      setLogs(mockData);
      setFilteredLogs(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter logs based on search term
    if (searchTerm.trim() === "") {
      setFilteredLogs(logs);
    } else {
      const filtered = logs.filter(log => 
        Object.values(log).some(value => 
          value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredLogs(filtered);
    }
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, logs]);

  // Get current logs for pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if the file is a CSV
    if (file.type !== "text/csv" && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsedLogs = parseCSV(text);
      setLogs(parsedLogs);
      setFilteredLogs(parsedLogs);
      toast({
        title: "CSV file loaded",
        description: `Successfully loaded ${parsedLogs.length} log entries`
      });
    };
    reader.readAsText(file);
  };

  const parseCSV = (csvText: string): LogEntry[] => {
    // Basic CSV parsing
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).filter(line => line.trim()).map(line => {
      const values = line.split(',');
      const entry: any = {};
      
      headers.forEach((header, index) => {
        entry[header.trim()] = values[index] ? values[index].trim() : '';
      });
      
      return entry as LogEntry;
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 max-w-full">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Detailed Logs</h1>
            <p className="text-gray-500">
              View and analyze detailed security event logs
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('csv-file-input')?.click()}
            >
              <File className="h-4 w-4 mr-2" />
              Upload CSV
              <input
                id="csv-file-input"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileUpload}
              />
            </Button>
            <Button variant="outline" onClick={() => {
              toast({
                title: "Download initiated",
                description: "Your log file is being prepared for download"
              });
            }}>
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Security Event Logs</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search logs..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <p>Loading logs...</p>
              </div>
            ) : filteredLogs.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-center">
                <p className="text-gray-500 mb-4">No logs found</p>
                <p className="text-sm text-gray-400">
                  Try uploading a CSV file or adjusting your search criteria
                </p>
              </div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[180px]">Timestamp</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>File Extension</TableHead>
                        <TableHead>Process</TableHead>
                        <TableHead>Parent Process</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentLogs.map((log, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-xs">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-2 text-gray-400" />
                              {log.timestamp}
                            </div>
                          </TableCell>
                          <TableCell>{log.action}</TableCell>
                          <TableCell>{log.file_extension || "-"}</TableCell>
                          <TableCell>{log.process}</TableCell>
                          <TableCell>{log.parent_process || "-"}</TableCell>
                          <TableCell className="text-center">
                            {log.label === "1" ? (
                              <Badge variant="destructive" className="gap-1">
                                <AlertCircle className="h-3 w-3" />
                                Alert
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="gap-1 bg-green-50 text-green-600 border-green-200">
                                <Check className="h-3 w-3" />
                                Safe
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {totalPages > 1 && (
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(page => {
                            // Show first page, last page, current page, and pages around current page
                            return page === 1 || 
                                   page === totalPages || 
                                   (page >= currentPage - 1 && page <= currentPage + 1);
                          })
                          .map((page, i, arr) => (
                            <React.Fragment key={page}>
                              {i > 0 && arr[i-1] !== page - 1 && (
                                <PaginationItem>
                                  <span className="flex h-9 w-9 items-center justify-center">...</span>
                                </PaginationItem>
                              )}
                              <PaginationItem>
                                <PaginationLink
                                  isActive={page === currentPage}
                                  onClick={() => setCurrentPage(page)}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            </React.Fragment>
                          ))}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DetailedLogs;
