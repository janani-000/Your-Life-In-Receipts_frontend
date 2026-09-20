import { useMemo, useState } from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  ArrowRight, CalendarDays, ChevronRight, Clock3, CreditCard, Headphones, Home,
  Music2, ReceiptText, Search, Sparkles, TrendingUp, Utensils, WalletCards, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { financeTransactions, householdTransactions, spotifyHistory } from "@/data/life-data";
import { cn } from "@/lib/utils";

type Range = "all" | "30" | "peak";
type Stream = "spotify" | "finance" | "household";
type Detail = { title: string; kicker: string; narrative: string; score: number; metrics: string[] };

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const shortDate = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" });
const fullDate = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" });
const palette = { spotify: "var(--spotify)", finance: "var(--finance)", household: "var(--household)" };

const connections: Detail[] = [
  { title: "The Midnight Productivity Cycle", kicker: "RHYTHM DETECTED", score: 91, narrative: "Your deepest focus lives after dark. Long ambient and lo-fi sessions repeatedly land within an hour of late-night food orders—fuel for a ritual that turns quiet hours into productive ones.", metrics: ["4 late-night sessions", "3 food orders", "42 min median gap"] },
  { title: "Festival & Social Spikes", kicker: "SOCIAL SIGNAL", score: 87, narrative: "Celebration music predicts celebration spending. Your Bollywood and party listening peaked alongside dining, entertainment and shopping purchases during the August gathering window.", metrics: ["2.4× music lift", "₹12.7K social spend", "15–16 Aug"] },
  { title: "Quiet Sunday Reset", kicker: "WEEKLY RITUAL", score: 84, narrative: "Soft acoustic mornings are your reset signal. They coincide with pantry restocks and utility clearances, turning Sundays into a calm ritual of getting life back in order.", metrics: ["3 Sunday resets", "₹10.2K essentials", "89% morning overlap"] },
  { title: "Fitness Push", kicker: "MOMENTUM LOOP", score: 79, narrative: "Upbeat EDM listening rises around gym renewals, healthier meal choices and recovery supplies. Your soundtrack and spending both point to a renewed wellness habit.", metrics: ["2 EDM surges", "₹7.5K wellness", "6-week pattern"] },
];

const chapters: Detail[] = [
  { title: "The Late Night Hustle", kicker: "04 MAY — 21 JUN", score: 92, narrative: "Screens glowing past midnight, Tycho and Øneheart in the background, dinner arriving quietly at the door. This was your most consistent creative rhythm.", metrics: ["16.8 listening hrs", "7 after-dark orders", "Focused · introspective"] },
  { title: "Monsoon Weekend Solitude", kicker: "07 JUN — 19 JUL", score: 82, narrative: "Rainy weekends slowed your pace. Acoustic playlists, pantry restocks and a small home repair made your space feel cared for and deliberately quiet.", metrics: ["9 calm sessions", "₹9.8K at home", "Restorative · grounded"] },
  { title: "Festive Gathering Season", kicker: "15 — 16 AUG", score: 88, narrative: "Music moved from private to shared. A bright Bollywood soundtrack, dinner supplies, tickets and new clothes trace the shape of a full house.", metrics: ["4.2 listening hrs", "₹17.3K gathered", "Joyful · social"] },
  { title: "The Wellness Reset", kicker: "03 JUL — 12 SEP", score: 80, narrative: "A gym renewal became a pattern: energetic mornings, deliberate meals and recovery essentials. This chapter feels less like a resolution and more like momentum.", metrics: ["12 workout tracks", "₹7.5K invested", "Energised · hopeful"] },
];

function dateKey(value: string) { return value.slice(0, 10); }
function monthKey(value: string) { return value.slice(0, 7); }
function sum<T>(items: T[], get: (item: T) => number | null) { return items.reduce((total, item) => total + (get(item) ?? 0), 0); }

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <div className="mb-7 max-w-2xl"><p className="section-kicker">{eyebrow}</p><h2 className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl">{title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">{copy}</p></div>;
}

function MetricCard({ stream, icon: Icon, label, value, note }: { stream: Stream; icon: typeof Music2; label: string; value: string; note: string }) {
  return <div className={cn("metric-card group", `stream-${stream}`)}>
    <div className="flex items-center justify-between"><div className="stream-icon"><Icon /></div><TrendingUp className="h-4 w-4 opacity-50" /></div>
    <p className="mt-8 text-xs font-semibold uppercase text-muted-foreground">{label}</p><p className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl">{value}</p><p className="mt-2 text-sm text-muted-foreground">{note}</p>
  </div>;
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return <div className="chart-tooltip"><p className="mb-2 font-medium text-foreground">{label}</p>{payload.map((item) => <div key={item.name} className="flex items-center justify-between gap-6 text-xs"><span className="flex items-center gap-2 text-muted-foreground"><i style={{ background: item.color }} />{item.name}</span><b>{item.name === "Listening" ? `${item.value.toFixed(1)} hrs` : money.format(item.value)}</b></div>)}</div>;
}

function PulseTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ payload: { Listening: number; Financial: number; Household: number } }>; label?: string }) {
  if (!active || !payload?.length) return null;
  const first = payload[0];
  if (!first) return null;
  const point = first.payload;
  return <div className="chart-tooltip"><p className="mb-2 font-medium text-foreground">{label}</p><div className="space-y-1.5 text-xs"><p className="flex justify-between gap-8 text-muted-foreground"><span>Listening</span><b className="text-foreground">{point.Listening.toFixed(1)} hrs</b></p><p className="flex justify-between gap-8 text-muted-foreground"><span>Financial</span><b className="text-foreground">{money.format(point.Financial)}</b></p><p className="flex justify-between gap-8 text-muted-foreground"><span>Household</span><b className="text-foreground">{money.format(point.Household)}</b></p></div></div>;
}

export function LifeDashboard() {
  const latest = new Date(Math.max(...[...spotifyHistory, ...financeTransactions, ...householdTransactions].map((x) => new Date(x.timestamp).getTime())));
  const [range, setRange] = useState<Range>("all");
  const [layers, setLayers] = useState<Record<Stream, boolean>>({ spotify: true, finance: true, household: true });
  const [detail, setDetail] = useState<Detail | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<"all" | Stream>("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<"newest" | "highest">("newest");

  const peakMonth = useMemo(() => {
    const totals = new Map<string, number>();
    [...financeTransactions, ...householdTransactions].forEach((x) => totals.set(monthKey(x.timestamp), (totals.get(monthKey(x.timestamp)) ?? 0) + (x.amount ?? 0)));
    return [...totals].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";
  }, []);
  const keep = (timestamp: string) => range === "all" || (range === "peak" ? monthKey(timestamp) === peakMonth : new Date(timestamp) >= new Date(latest.getTime() - 30 * 86400000));
  const music = spotifyHistory.filter((x) => keep(x.timestamp));
  const finance = financeTransactions.filter((x) => keep(x.timestamp) && x.status === "Completed");
  const household = householdTransactions.filter((x) => keep(x.timestamp) && x.type === "expense");
  const hours = sum(music, (x) => x.msPlayed) / 3600000;
  const financialSpend = sum(finance, (x) => x.amount);
  const homeSpend = sum(household, (x) => x.amount);

  const timeline = useMemo(() => {
    const days = new Map<string, { date: string; label: string; Listening: number; Financial: number; Household: number }>();
    const ensure = (ts: string) => { const key = dateKey(ts); if (!days.has(key)) days.set(key, { date: key, label: shortDate.format(new Date(ts)), Listening: 0, Financial: 0, Household: 0 }); return days.get(key); };
    music.forEach((x) => { const day = ensure(x.timestamp); if (day) day.Listening += (x.msPlayed ?? 0) / 3600000; });
    finance.forEach((x) => { const day = ensure(x.timestamp); if (day) day.Financial += x.amount ?? 0; });
    household.forEach((x) => { const day = ensure(x.timestamp); if (day) day.Household += x.amount ?? 0; });
    return [...days.values()].sort((a, b) => a.date.localeCompare(b.date));
  }, [range]);
  const pulseTimeline = useMemo(() => {
    const maxima = {
      Listening: Math.max(...timeline.map((x) => x.Listening), 1),
      Financial: Math.max(...timeline.map((x) => x.Financial), 1),
      Household: Math.max(...timeline.map((x) => x.Household), 1),
    };
    return timeline.map((x) => ({ ...x, listeningPulse: x.Listening / maxima.Listening * 100, financialPulse: x.Financial / maxima.Financial * 100, householdPulse: x.Household / maxima.Household * 100 }));
  }, [timeline]);

  const categorySpend = useMemo(() => {
    const map = new Map<string, number>(); finance.forEach((x) => map.set(x.category, (map.get(x.category) ?? 0) + (x.amount ?? 0)));
    return [...map].map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [range]);
  const musicByTime = ["Morning", "Afternoon", "Evening", "Late night"].map((name) => ({ name, plays: music.filter((x) => x.timeOfDay === name).length }));
  const homeByCategory = useMemo(() => { const map = new Map<string, number>(); household.forEach((x) => map.set(x.category, (map.get(x.category) ?? 0) + (x.amount ?? 0))); return [...map].map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value); }, [range]);
  const artists = Object.entries(music.reduce<Record<string, number>>((a, x) => ({ ...a, [x.artistName]: (a[x.artistName] ?? 0) + (x.msPlayed ?? 0) }), {})).sort((a, b) => b[1] - a[1]).slice(0, 4);

  const receipts = useMemo(() => {
    const all = [
      ...music.map((x) => ({ source: "spotify" as Stream, timestamp: x.timestamp, title: x.trackName, subtitle: `${x.artistName} · ${x.album}`, category: x.genre, value: `${Math.round((x.msPlayed ?? 0) / 60000)} min`, meta: `${x.platform} · ${x.timeOfDay}` })),
      ...finance.map((x) => ({ source: "finance" as Stream, timestamp: x.timestamp, title: x.merchant, subtitle: x.category, category: x.category, value: money.format(x.amount ?? 0), meta: `${x.paymentMode} · ${x.status}` })),
      ...household.map((x) => ({ source: "household" as Stream, timestamp: x.timestamp, title: x.note, subtitle: `${x.category} · ${x.subcategory}`, category: x.category, value: money.format(x.amount ?? 0), meta: x.paymentMethod })),
    ];
    return all.filter((x) => source === "all" || x.source === source).filter((x) => category === "all" || x.category === category).filter((x) => `${x.title} ${x.subtitle} ${x.meta}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === "newest" ? b.timestamp.localeCompare(a.timestamp) : (parseInt(b.value.replace(/\D/g, "")) || 0) - (parseInt(a.value.replace(/\D/g, "")) || 0));
  }, [music, finance, household, source, category, query, sort]);
  const categories = [...new Set([...finance, ...household].map((x) => x.category).concat(music.map((x) => x.genre)))].sort();
  const selectedReceipts = selectedDay ? receipts.filter((x) => dateKey(x.timestamp) === selectedDay) : [];

  return <main className="min-h-screen bg-background text-foreground">
    <div className="ambient-grid" />
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="flex items-center gap-2 text-sm font-semibold"><span className="logo-mark"><ReceiptText /></span>LIFE / RECEIPTS</a>
        <nav className="hidden items-center gap-7 text-xs text-muted-foreground md:flex"><a href="#pulse">Pulse</a><a href="#connections">Connections</a><a href="#chapters">Chapters</a><a href="#lenses">Lenses</a><a href="#receipts">Receipts</a></nav>
        <span className="live-pill"><i /> LIVE DATA</span>
      </div>
    </header>

    <section id="top" className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 lg:px-8 lg:pt-24">
      <div className="max-w-4xl">
        <p className="section-kicker flex items-center gap-2"><Sparkles className="h-4 w-4" /> PERSONAL DATA INTELLIGENCE</p>
        <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.98] sm:text-7xl lg:text-8xl">Your Life,<br/><span className="text-gradient">In Receipts.</span></h1>
        <p className="mt-6 max-w-xl text-lg leading-7 text-muted-foreground sm:text-xl">Thousands of digital moments. One story waiting to be discovered.</p>
      </div>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="range-control" aria-label="Time range">{([['all','All Time'],['30','Past 30 Days'],['peak','Peak Month']] as const).map(([id, label]) => <Button key={id} variant="ghost" size="sm" onClick={() => setRange(id)} className={cn("range-button", range === id && "active")}>{label}</Button>)}</div>
        <p className="flex items-center gap-2 text-xs text-muted-foreground"><CalendarDays className="h-4 w-4" /> May — September 2026 · 3 connected sources</p>
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        <MetricCard stream="spotify" icon={Headphones} label="Listening moments" value={`${music.length} tracks`} note={`${hours.toFixed(1)} hours streamed`} />
        <MetricCard stream="finance" icon={WalletCards} label="Financial transactions" value={money.format(financialSpend)} note={`${finance.length} across UPI & cards`} />
        <MetricCard stream="household" icon={Home} label="Household receipts" value={money.format(homeSpend)} note={`${household.length} essential home expenses`} />
      </div>
    </section>

    <section id="pulse" className="section-band">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><SectionHeading eyebrow="01 / LIFE PULSE" title="Three streams. One rhythm." copy="Your listening, spending and household activity moving through time together." />
          <div className="mb-7 flex flex-wrap gap-2">{([['spotify','Spotify'],['finance','Financial'],['household','Household']] as const).map(([id,label]) => <Button key={id} variant="outline" size="sm" onClick={() => setLayers((l) => ({...l,[id]:!l[id]}))} className={cn("layer-button", `stream-${id}`, layers[id] && "active")}><i />{label}</Button>)}</div>
        </div>
        <div className="chart-panel">
          <div className="mb-5 flex items-center justify-between"><p className="text-sm font-medium">Activity timeline</p><p className="text-xs text-muted-foreground">Select a point to reveal its receipts</p></div>
          <div className="h-[330px] w-full"><ResponsiveContainer width="100%" height="100%"><LineChart data={pulseTimeline} margin={{ top: 8, right: 10, left: -18, bottom: 0 }} onClick={(state) => { const payload = state?.activePayload?.[0]?.payload as { date?: string } | undefined; if (payload?.date) setSelectedDay(payload.date); }}><CartesianGrid stroke="var(--grid)" vertical={false}/><XAxis dataKey="label" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} minTickGap={28}/><YAxis domain={[0,100]} stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v)=>`${v}%`}/><Tooltip content={<PulseTooltip />}/>{layers.spotify && <Line name="Listening" type="monotone" dataKey="listeningPulse" stroke={palette.spotify} strokeWidth={2.4} dot={{r:3,fill:palette.spotify,strokeWidth:0}} activeDot={{r:6}}/>}{layers.finance && <Line name="Financial" type="monotone" dataKey="financialPulse" stroke={palette.finance} strokeWidth={2.4} dot={{r:3,fill:palette.finance,strokeWidth:0}} activeDot={{r:6}}/>}{layers.household && <Line name="Household" type="monotone" dataKey="householdPulse" stroke={palette.household} strokeWidth={2.4} dot={{r:3,fill:palette.household,strokeWidth:0}} activeDot={{r:6}}/>}</LineChart></ResponsiveContainer></div>
          {selectedDay && <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4"><span className="mr-2 text-xs text-muted-foreground">{fullDate.format(new Date(selectedDay))}</span>{selectedReceipts.length ? selectedReceipts.map((x) => <span key={`${x.source}${x.title}`} className={cn("mini-receipt",`stream-${x.source}`)}>{x.title} · {x.value}</span>) : <span className="text-xs text-muted-foreground">Change receipt filters to reveal related moments.</span>}</div>}
        </div>
      </div>
    </section>

    <section id="connections" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><SectionHeading eyebrow="02 / DISCOVER CONNECTIONS" title="Patterns hiding in plain sight." copy="Signals that only emerge when your data stops living in separate boxes." />
      <div className="grid gap-4 md:grid-cols-2">{connections.map((item, index) => <article key={item.title} className="connection-card group">
        <div className="flex items-start justify-between gap-4"><span className="signal-badge"><Zap /> {item.kicker}</span><span className="score-ring">{item.score}<small>%</small></span></div>
        <h3 className="mt-8 text-2xl font-semibold">{item.title}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{item.narrative}</p>
        <div className="mt-6 flex flex-wrap gap-2"><span className="data-pill stream-spotify"><i/>Audio</span><span className="data-pill stream-finance"><i/>Transactions</span>{index !== 0 && <span className="data-pill stream-household"><i/>Household</span>}</div>
        <div className="mt-7 grid grid-cols-3 gap-3 border-y border-border py-4">{item.metrics.map((m) => <span key={m} className="text-xs font-medium text-muted-foreground">{m}</span>)}</div>
        <Button variant="ghost" onClick={() => setDetail(item)} className="mt-5 px-0 text-sm text-foreground hover:bg-transparent">Explore connection <ArrowRight /></Button>
      </article>)}</div>
    </section>

    <section id="chapters" className="section-band"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><SectionHeading eyebrow="03 / LIFE CHAPTERS" title="Your season, told in chapters." copy="Activity clusters translated into the moments, moods and turning points that shaped your months." />
      <div className="chapter-rail">{chapters.map((item, i) => <button key={item.title} onClick={() => setDetail(item)} className="chapter-row group"><span className="chapter-number">0{i+1}</span><div><p className="text-xs font-semibold text-muted-foreground">{item.kicker}</p><h3 className="mt-2 text-xl font-semibold sm:text-2xl">{item.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{item.narrative}</p></div><div className="hidden text-right lg:block"><p className="text-sm font-medium">{item.metrics[2]}</p><p className="mt-1 text-xs text-muted-foreground">{item.metrics[0]} · {item.metrics[1]}</p></div><ChevronRight className="chapter-arrow" /></button>)}</div>
    </div></section>

    <section id="lenses" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><SectionHeading eyebrow="04 / THREE LENSES" title="Look closer." copy="Each dataset has its own texture. Switch lenses to see the habits beneath the headline." />
      <Tabs defaultValue="music"><TabsList className="lens-tabs"><TabsTrigger value="music"><Music2 /> Music Lens</TabsTrigger><TabsTrigger value="money"><CreditCard /> Money Lens</TabsTrigger><TabsTrigger value="home"><Home /> Daily Life Lens</TabsTrigger></TabsList>
        <TabsContent value="music" className="lens-panel"><div className="lens-summary stream-spotify"><p>YOUR SOUNDTRACK</p><strong>{hours.toFixed(1)}h</strong><span>{music.length} tracks · {Math.round((music.filter(x=>x.skipped).length/Math.max(music.length,1))*100)}% skip rate</span></div><div className="h-64"><ResponsiveContainer><BarChart data={musicByTime}><CartesianGrid stroke="var(--grid)" vertical={false}/><XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} axisLine={false} tickLine={false}/><YAxis stroke="var(--muted-foreground)" fontSize={11} axisLine={false} tickLine={false}/><Tooltip cursor={{fill:"var(--surface-hover)"}}/><Bar dataKey="plays" fill={palette.spotify} radius={[4,4,0,0]}/></BarChart></ResponsiveContainer></div><div className="rank-list"><p className="rank-title">Top artists</p>{artists.map(([artist, time],i)=><div key={artist}><span>0{i+1}</span><b>{artist}</b><em>{Math.round(time/60000)} min</em></div>)}</div></TabsContent>
        <TabsContent value="money" className="lens-panel"><div className="lens-summary stream-finance"><p>FLOW OF MONEY</p><strong>{money.format(financialSpend)}</strong><span>{finance.length} payments · {Math.round(finance.filter(x=>x.paymentMode==='UPI').length/Math.max(finance.length,1)*100)}% via UPI</span></div><div className="h-64"><ResponsiveContainer><PieChart><Pie data={categorySpend} dataKey="value" nameKey="name" innerRadius={56} outerRadius={88} paddingAngle={3}>{categorySpend.map((_,i)=><Cell key={i} fill={[palette.finance,"var(--violet)","var(--amber)",palette.spotify,"var(--coral)"][i%5]}/>)}</Pie><Tooltip formatter={(v)=>money.format(Number(v))}/></PieChart></ResponsiveContainer></div><div className="rank-list"><p className="rank-title">Top categories</p>{categorySpend.slice(0,4).map((x,i)=><div key={x.name}><span>0{i+1}</span><b>{x.name}</b><em>{money.format(x.value)}</em></div>)}</div></TabsContent>
        <TabsContent value="home" className="lens-panel"><div className="lens-summary stream-household"><p>HOME ECONOMY</p><strong>{money.format(homeSpend)}</strong><span>{household.length} expenses · {Math.round(homeSpend/5)} monthly avg</span></div><div className="h-64"><ResponsiveContainer><AreaChart data={homeByCategory}><CartesianGrid stroke="var(--grid)" vertical={false}/><XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={10} axisLine={false} tickLine={false}/><YAxis stroke="var(--muted-foreground)" fontSize={11} axisLine={false} tickLine={false}/><Tooltip formatter={(v)=>money.format(Number(v))}/><Area dataKey="value" stroke={palette.household} fill="var(--household-fade)" strokeWidth={2}/></AreaChart></ResponsiveContainer></div><div className="rank-list"><p className="rank-title">Essential categories</p>{homeByCategory.slice(0,4).map((x,i)=><div key={x.name}><span>0{i+1}</span><b>{x.name}</b><em>{money.format(x.value)}</em></div>)}</div></TabsContent>
      </Tabs>
    </section>

    <section id="receipts" className="section-band"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><SectionHeading eyebrow="05 / RECEIPT EXPLORER" title="Every moment, accounted for." copy="Search the unified stream behind every chart, pattern and chapter." />
      <div className="filter-bar"><div className="search-wrap"><Search/><Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search merchants, songs, notes…" aria-label="Search receipts"/></div><select value={source} onChange={(e)=>setSource(e.target.value as typeof source)} aria-label="Source filter"><option value="all">All sources</option><option value="spotify">Spotify</option><option value="finance">Transactions</option><option value="household">Household</option></select><select value={category} onChange={(e)=>setCategory(e.target.value)} aria-label="Category filter"><option value="all">All categories</option>{categories.map(c=><option key={c}>{c}</option>)}</select><select value={sort} onChange={(e)=>setSort(e.target.value as typeof sort)} aria-label="Sort receipts"><option value="newest">Newest first</option><option value="highest">Highest value</option></select></div>
      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{receipts.slice(0,12).map((item)=><article key={`${item.timestamp}${item.title}`} className={cn("receipt-card",`stream-${item.source}`)}><div className="receipt-top"><span className="data-pill"><i/>{item.source === 'spotify'?'AUDIO':item.source === 'finance'?'FINANCIAL':'HOUSEHOLD'}</span><span>{shortDate.format(new Date(item.timestamp))} · {new Date(item.timestamp).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</span></div><div className="receipt-dash"/><div className="flex items-end justify-between gap-4"><div className="min-w-0"><h3 className="truncate font-semibold">{item.title}</h3><p className="mt-1 truncate text-xs text-muted-foreground">{item.subtitle}</p></div><strong className="shrink-0 text-lg">{item.value}</strong></div><div className="mt-5 flex items-center justify-between border-t border-dashed border-border pt-3 text-xs text-muted-foreground"><span>{item.meta}</span><span>{item.category}</span></div></article>)}</div>
      {!receipts.length && <div className="empty-state">No receipts match those filters.</div>}
    </div></section>

    <footer className="border-t border-border"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-10 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>YOUR LIFE, IN RECEIPTS</span><span>Raw data → insights → connections → story.</span><span>Private by design · Local demo data</span></div></footer>

    <Sheet open={!!detail} onOpenChange={(open)=>!open&&setDetail(null)}><SheetContent className="detail-sheet overflow-y-auto sm:max-w-xl"><SheetHeader><p className="section-kicker">{detail?.kicker}</p><SheetTitle className="mt-4 text-3xl">{detail?.title}</SheetTitle><SheetDescription className="pt-3 text-base leading-7">{detail?.narrative}</SheetDescription></SheetHeader><div className="mt-9 grid grid-cols-3 gap-2">{detail?.metrics.map(m=><div key={m} className="detail-metric">{m}</div>)}</div><div className="mt-10"><p className="text-xs font-semibold uppercase text-muted-foreground">Synchronized evidence</p><div className="mt-4 h-40"><ResponsiveContainer><LineChart data={timeline.slice(-8)}><XAxis dataKey="label" hide/><YAxis hide/><Tooltip content={<ChartTooltip />}/><Line dataKey="Listening" stroke={palette.spotify} dot={false}/><Line dataKey="Financial" stroke={palette.finance} dot={false}/><Line dataKey="Household" stroke={palette.household} dot={false}/></LineChart></ResponsiveContainer></div></div><div className="mt-8 space-y-3">{receipts.slice(0,5).map(x=><div key={`${x.timestamp}${x.title}`} className="drawer-receipt"><span className={cn("source-dot",`stream-${x.source}`)}/><div><b>{x.title}</b><p>{x.subtitle}</p></div><strong>{x.value}</strong></div>)}</div></SheetContent></Sheet>
  </main>;
}