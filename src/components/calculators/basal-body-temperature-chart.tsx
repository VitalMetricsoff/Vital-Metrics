
import { useState } from "react";
import { addDays, format, isAfter, isBefore, parse, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { CalendarIcon, InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface TemperatureEntry {
  date: Date;
  temperature: number;
  note?: string;
}

export function BasalBodyTemperatureChart() {
  const [entries, setEntries] = useState<TemperatureEntry[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [temperature, setTemperature] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [viewRange, setViewRange] = useState<[Date, Date]>([
    startOfDay(addDays(new Date(), -30)), 
    startOfDay(new Date())
  ]);

  const handleAddEntry = () => {
    if (!temperature) {
      setError("Please enter a temperature");
      return;
    }

    const tempValue = parseFloat(temperature);
    if (isNaN(tempValue) || tempValue < 95 || tempValue > 100) {
      setError("Please enter a valid temperature between 95°F and 100°F");
      return;
    }

    const existingEntryIndex = entries.findIndex(
      entry => format(entry.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );

    if (existingEntryIndex >= 0) {
      const updatedEntries = [...entries];
      updatedEntries[existingEntryIndex] = { date, temperature: tempValue, note };
      setEntries(updatedEntries);
    } else {
      setEntries([...entries, { date, temperature: tempValue, note }]);
    }

    setTemperature("");
    setNote("");
    setError("");
  };

  const getChartData = () => {
    // Sort entries by date
    const sortedEntries = [...entries].sort((a, b) => a.date.getTime() - b.date.getTime());
    
    // Filter entries to only show within view range
    return sortedEntries
      .filter(entry => 
        isAfter(entry.date, viewRange[0]) && 
        isBefore(entry.date, viewRange[1])
      )
      .map(entry => ({
        date: format(entry.date, "MMM dd"),
        temperature: entry.temperature,
        formattedDate: format(entry.date, "MMMM d, yyyy"),
        note: entry.note
      }));
  };

  const chartData = getChartData();
  
  const averageTemp = entries.length > 0 
    ? entries.reduce((sum, entry) => sum + entry.temperature, 0) / entries.length 
    : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature (°F)</Label>
              <div className="relative">
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  placeholder="98.6"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">°F</span>
              </div>
            </div>
            
            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="note">Note (optional)</Label>
              <Input
                id="note"
                placeholder="Period, ovulation symptoms, etc."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
          
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
          
          <Button onClick={handleAddEntry} className="w-full mt-4">
            Add Temperature Entry
          </Button>
        </CardContent>
      </Card>

      {entries.length > 0 && (
        <CalculatorResult title="Basal Body Temperature Chart" onDownload={() => {
          // Simple CSV export
          const csv = [
            "Date,Temperature,Note",
            ...entries.map(entry => 
              `${format(entry.date, "yyyy-MM-dd")},${entry.temperature},${entry.note || ""}`
            )
          ].join("\n");
          
          const blob = new Blob([csv], { type: "text/csv" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `bbt-chart-${format(new Date(), "yyyy-MM-dd")}.csv`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Average temperature: </p>
                <span className="text-primary font-semibold">{averageTemp.toFixed(1)}°F</span>
              </div>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const newStartDate = addDays(viewRange[0], -15);
                    const newEndDate = addDays(viewRange[1], -15);
                    setViewRange([newStartDate, newEndDate]);
                  }}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="ml-2"
                  onClick={() => {
                    const newStartDate = addDays(viewRange[0], 15);
                    const newEndDate = addDays(viewRange[1], 15);
                    setViewRange([newStartDate, newEndDate]);
                  }}
                >
                  Next
                </Button>
              </div>
            </div>

            <div className="h-80 mt-4">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[97, 99]} />
                    <Tooltip 
                      formatter={(value, name, props) => [`${value}°F`, 'Temperature']}
                      labelFormatter={(label) => {
                        const entry = chartData.find(e => e.date === label);
                        return entry ? entry.formattedDate : label;
                      }}
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const entry = chartData.find(e => e.date === label);
                          return (
                            <div className="bg-background p-2 border rounded shadow-sm">
                              <p className="font-medium">{entry?.formattedDate}</p>
                              <p className="text-primary">{`Temperature: ${payload[0].value}°F`}</p>
                              {entry?.note && <p className="text-sm mt-1">{entry.note}</p>}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <ReferenceLine y={averageTemp} stroke="#ff4d4f" strokeDasharray="3 3" />
                    <Line 
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="#3b82f6" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">No data available for selected date range</p>
                </div>
              )}
            </div>

            <div className="mt-4 bg-muted p-4 rounded-md">
              <div className="flex items-start">
                <InfoIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Basal Body Temperature (BBT)</span> is your temperature when you're fully at rest.
                  </p>
                  <p>A sustained rise in BBT (0.4-1.0°F) often indicates ovulation has occurred. This rise happens due to increased progesterone levels after ovulation.</p>
                  <p>For best results, measure your temperature immediately after waking, before any activity, at the same time each day.</p>
                </div>
              </div>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
