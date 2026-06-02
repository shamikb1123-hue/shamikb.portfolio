import React, { useState } from 'react';
import { Truck, CheckSquare, ClipboardList, Database, AlertCircle, PlaySquare, Plus } from 'lucide-react';

export default function SupplyChainHub() {
  const [stocks, setStocks] = useState({
    syrup: 120, // liters
    water: 800, // liters
    bottles: 500, // units
    finishedCases: 15, // full cases of beverages
  });

  const [destination, setDestination] = useState('Siliguri Retailer');
  const [dispatchLogs, setDispatchLogs] = useState<Array<{ id: string; msg: string; time: string; type: string }>>([
    { id: '1', msg: 'System Booted. Inventory initialized for Skymount Beverages Hub.', time: '09:00', type: 'info' },
    { id: '2', msg: 'Finished Cases stock level vetted by Shamik Banerjee (SCM Lead).', time: '09:12', type: 'success' }
  ]);
  const [shippingPerformance, setShippingPerformance] = useState(97.4);
  const [qualityPassCount, setQualityPassCount] = useState(1);

  const writeLog = (msg: string, type = 'info') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setDispatchLogs(prev => [
      { id: Date.now().toString(), msg, time, type },
      ...prev.slice(0, 8) // Limit to 9 items
    ]);
  };

  const handleIngest = () => {
    setStocks(prev => ({
      ...prev,
      syrup: prev.syrup + 50,
      water: prev.water + 250,
      bottles: prev.bottles + 100
    }));
    writeLog("Received raw inventory stock: +50L Syrup, +250L Purified Water, +100 Glass Bottles.", 'success');
  };

  const handleBottling = () => {
    if (stocks.syrup < 10 || stocks.water < 50 || stocks.bottles < 24) {
      writeLog("Bottling failed: Insufficient raw resources. Minimum required: 10L Syrup, 50L Water, 24 Bottles.", 'error');
      return;
    }

    setStocks(prev => ({
      syrup: prev.syrup - 10,
      water: prev.water - 50,
      bottles: prev.bottles - 24,
      finishedCases: prev.finishedCases + 1 // 1 case = 24 bottles
    }));
    writeLog("Bottling session complete: Consumed 10L Syrup, 50L Water, 24 Bottles. Crafted 1 full case (24 units) of Finished Brews.", 'info');
  };

  const handleQualityCheck = () => {
    const pH = (6.2 + Math.random() * 0.6).toFixed(2);
    const co2Purity = (99.1 + Math.random() * 0.8).toFixed(2);
    const passed = Math.random() > 0.05; 

    setQualityPassCount(prev => prev + 1);

    if (passed) {
      writeLog(`Quality Audit #${qualityPassCount} PASSED - pH: ${pH}, Carbonation Purity: ${co2Purity}%. No residue detected.`, 'success');
    } else {
      writeLog(`Quality Audit #${qualityPassCount} WARN - High pH variance (${pH}). Recommended flushing reservoir line 3.`, 'error');
    }
  };

  const handleDispatch = () => {
    if (stocks.finishedCases < 1) {
      writeLog("Logistics failure: No finished beverage cases in warehouse storage.", 'error');
      return;
    }

    setStocks(prev => ({ ...prev, finishedCases: prev.finishedCases - 1 }));
    const latency = (12 + Math.random() * 8).toFixed(1);
    
    // update performance metric
    setShippingPerformance(prev => {
      const adjustment = Math.random() > 0.3 ? 0.2 : -0.4;
      return Math.min(100, Math.max(85, Number((prev + adjustment).toFixed(2))));
    });

    writeLog(`Dispatched 1 case of Skymount Brews to [${destination}]. Est travel latency: ${latency} hrs.`, 'success');
  };

  return (
    <div id="scm_hub_interactive" className="bg-charcoal-medium border border-charcoal-light rounded-xl p-5 md:p-6 text-gray-300">
      <div className="flex flex-wrap justify-between items-center gap-3 border-b border-charcoal-light pb-4 mb-5">
        <div>
          <h4 className="text-xl font-display font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-5 bg-neon-orange rounded-full inline-block"></span>
            Skymount Logistics & Quality Grid
          </h4>
          <p className="text-xs text-gray-400 mt-1">Interactive inventory audit simulator reflecting actual SCM beverage tracking parameters</p>
        </div>
        <div className="bg-charcoal-dark border border-charcoal-light rounded-lg px-3 py-1 text-xs">
          <span className="text-gray-400">Dispatcher Status: </span>
          <span className="text-neon-orange font-mono font-semibold">ONLINE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Resource Tracker widgets */}
        <div className="space-y-4">
          <h5 className="text-xs font-mono font-semibold text-neon-orange uppercase tracking-wider">Raw Stocks & Warehousing</h5>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-charcoal-dark p-3 rounded-lg border border-charcoal-light">
              <span className="text-[10px] text-gray-500 font-mono">RAW SYRUP</span>
              <div className="text-lg font-bold text-white mt-1">{stocks.syrup} L</div>
              <div className="text-[9px] text-[#ff8533] mt-1 flex items-center gap-1">
                <span>Min limits safe</span>
              </div>
            </div>

            <div className="bg-charcoal-dark p-3 rounded-lg border border-charcoal-light">
              <span className="text-[10px] text-gray-500 font-mono">PURIFIED WATER</span>
              <div className="text-lg font-bold text-white mt-1">{stocks.water} L</div>
              <div className="text-[9px] text-gray-400 mt-1">Sourced Siliguri</div>
            </div>

            <div className="bg-charcoal-dark p-3 rounded-lg border border-charcoal-light">
              <span className="text-[10px] text-gray-500 font-mono">GLASS BOTTLES</span>
              <div className="text-lg font-bold text-white mt-1">{stocks.bottles} pcs</div>
              <div className="text-[9px] text-emerald-400 mt-1">Cleaned & Sterilised</div>
            </div>

            <div className="bg-charcoal-dark p-3 rounded-lg border border-charcoal-light bg-gradient-to-br from-charcoal-dark to-neon-orange/10">
              <span className="text-[10px] text-neon-orange font-mono">FINISHED CASES</span>
              <div className="text-xl font-bold text-white mt-1">{stocks.finishedCases} cases</div>
              <div className="text-[9px] text-white/50 mt-1">24 bottles per case</div>
            </div>
          </div>

          <div className="bg-charcoal-dark p-3.5 rounded-lg border border-charcoal-light space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Order Dispatch Precision:</span>
              <span className="font-mono text-white font-semibold">{shippingPerformance}%</span>
            </div>
            {/* progress indicator */}
            <div className="w-full bg-charcoal-light h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-neon-orange h-1.5 rounded-full shadow-[0_0_10px_rgba(255,95,0,0.5)]" 
                style={{ width: `${shippingPerformance}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Dispatch & Operations interface */}
        <div className="space-y-4">
          <h5 className="text-xs font-mono font-semibold text-neon-orange uppercase tracking-wider">Operational Dispatches</h5>
          
          <div className="bg-charcoal-dark p-4 rounded-xl border border-charcoal-light space-y-4">
            <div>
              <label htmlFor="supply_ingest_btn" className="block text-xs font-medium text-gray-400 mb-1.5">1. Raw Supplies Procurement</label>
              <button 
                id="supply_ingest_btn"
                onClick={handleIngest}
                className="w-full bg-charcoal-light hover:bg-neon-orange/20 hover:text-white border border-charcoal-light hover:border-neon-orange text-xs text-gray-300 font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Procure Inbound Syrup & Bottles
              </button>
            </div>

            <div>
              <label htmlFor="bottling_pass_btn" className="block text-xs font-medium text-gray-400 mb-1.5">2. In-Plant Production Processing</label>
              <button 
                id="bottling_pass_btn"
                onClick={handleBottling}
                className="w-full bg-charcoal-light hover:bg-neon-orange/20 hover:text-white border border-charcoal-light hover:border-neon-orange text-xs text-gray-300 font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Database className="w-3.5 h-3.5" />
                Run Casing & Bottling Run (24 Cans)
              </button>
            </div>

            <div>
              <label htmlFor="quality_check_btn" className="block text-xs font-medium text-gray-400 mb-1.5">3. Quality Assurance Audit Check</label>
              <button 
                id="quality_check_btn"
                onClick={handleQualityCheck}
                className="w-full bg-charcoal-light hover:bg-neon-orange/25 hover:text-white border border-charcoal-light hover:border-neon-orange text-xs text-gray-300 font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                Perform QA Batch Analysis
              </button>
            </div>

            <div className="border-t border-charcoal-light pt-3 space-y-2">
              <label htmlFor="logistics_dispatch_btn" className="block text-xs font-medium text-gray-400">4. Final Freight Dispatch Gate</label>
              <div className="flex gap-2">
                <select 
                  id="logistics_destination_select"
                  value={destination} 
                  onChange={(e) => setDestination(e.target.value)}
                  className="flex-1 bg-charcoal-light border border-charcoal-light text-xs rounded-lg px-2 text-white focus:outline-none focus:border-neon-orange"
                >
                  <option value="Siliguri Retailer">Siliguri Retailer (Direct)</option>
                  <option value="West Bengal Distributor">West Bengal Dist (Bulk)</option>
                  <option value="Kolkata Central Warehouse">Kolkata Warehouse (Hub)</option>
                  <option value="Inspiria Som Cafeteria">Inspiria Cafeteria</option>
                </select>
                <button 
                  id="logistics_dispatch_btn"
                  onClick={handleDispatch}
                  className="bg-neon-orange hover:bg-neon-orange-dark text-black text-xs font-extrabold px-3 py-2 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5" />
                  Dispatch
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time telemetry log output */}
        <div className="space-y-4">
          <h5 className="text-xs font-mono font-semibold text-neon-orange uppercase tracking-wider flex justify-between items-center">
            <span>SCM Telemetry Log</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </h5>

          <div className="bg-black/80 border border-charcoal-light rounded-xl p-3 h-[256px] overflow-y-auto font-mono text-xs space-y-1.5 scrollbar-thin">
            {dispatchLogs.map((log) => (
              <div key={log.id} className="leading-tight p-1.5 rounded bg-charcoal-dark/30 hover:bg-charcoal-medium/50 transition-colors">
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>{log.time}</span>
                  <span className={`px-1 rounded uppercase text-[8px] font-semibold ${
                    log.type === 'success' ? 'bg-emerald-950 text-emerald-400' :
                    log.type === 'error' ? 'bg-red-950 text-red-400' : 'bg-charcoal-light text-gray-400'
                  }`}>
                    {log.type}
                  </span>
                </div>
                <div className="text-gray-300 mt-1 text-[11px] whitespace-pre-wrap">{log.msg}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
