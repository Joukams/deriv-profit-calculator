
import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./components/ui/select";

const indexTickValues = {
  "V75": 1000,
  "V50": 100,
  "V50(1s)": 100,
  "V25": 100,
  "V25(1s)": 100,
  "V100": 100,
  "V10": 100,
};

export default function App() {
  const [index, setIndex] = useState("V75");
  const [entry, setEntry] = useState(0);
  const [exit, setExit] = useState(0);
  const [lotSize, setLotSize] = useState(0.1);
  const [tickValue, setTickValue] = useState(indexTickValues["V75"]);

  const calculateProfit = () => {
    return ((exit - entry) * lotSize * tickValue).toFixed(2);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Deriv Profit Calculator</h2>

          <div>
            <Label>Index</Label>
            <Select value={index} onValueChange={(val) => {
              setIndex(val);
              setTickValue(indexTickValues[val]);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select index" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(indexTickValues).map((idx) => (
                  <SelectItem key={idx} value={idx}>{idx}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Entry Price</Label>
            <Input type="number" value={entry} onChange={(e) => setEntry(parseFloat(e.target.value))} />
          </div>

          <div>
            <Label>Exit Price</Label>
            <Input type="number" value={exit} onChange={(e) => setExit(parseFloat(e.target.value))} />
          </div>

          <div>
            <Label>Lot Size</Label>
            <Input type="number" value={lotSize} onChange={(e) => setLotSize(parseFloat(e.target.value))} />
          </div>

          <div>
            <Label>Tick Value</Label>
            <Input type="number" value={tickValue} onChange={(e) => setTickValue(parseFloat(e.target.value))} />
          </div>

          <div className="text-center mt-4">
            <h3 className="text-lg font-medium">Profit/Loss: ${calculateProfit()}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
