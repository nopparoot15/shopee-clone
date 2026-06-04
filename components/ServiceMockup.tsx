import { ReactElement } from "react";

interface Props {
  category: string;
  name: string;
}

const mockups: Record<string, () => ReactElement> = {
  landing: () => (
    <div className="w-full h-full bg-slate-900 flex flex-col">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 shrink-0">
        <span className="w-2 h-2 rounded-full bg-red-500" />
        <span className="w-2 h-2 rounded-full bg-yellow-500" />
        <span className="w-2 h-2 rounded-full bg-green-500" />
        <div className="flex-1 mx-2 h-3 rounded-full bg-slate-700" />
      </div>
      <div className="flex-1 p-3 space-y-2">
        <div className="h-4 bg-blue-600 rounded w-full" />
        <div className="pt-3 space-y-1.5">
          <div className="h-5 bg-white/90 rounded w-3/4" />
          <div className="h-3 bg-white/40 rounded w-full" />
          <div className="h-3 bg-white/40 rounded w-5/6" />
          <div className="mt-3 flex gap-2">
            <div className="h-6 w-16 bg-blue-500 rounded" />
            <div className="h-6 w-16 bg-white/20 rounded border border-white/30" />
          </div>
        </div>
        <div className="pt-2 grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-slate-800 rounded p-1.5 space-y-1">
              <div className="h-3 w-3 bg-blue-400 rounded" />
              <div className="h-2 bg-white/50 rounded w-full" />
              <div className="h-1.5 bg-white/30 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  company: () => (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 shrink-0">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="w-2 h-2 rounded-full bg-green-400" />
        <div className="flex-1 mx-2 h-3 rounded-full bg-gray-200" />
      </div>
      <div className="h-5 bg-slate-800 flex items-center px-3 gap-4 shrink-0">
        <div className="h-2.5 w-10 bg-white/80 rounded" />
        <div className="flex gap-3 ml-auto">
          {[0, 1, 2, 3].map((i) => <div key={i} className="h-1.5 w-6 bg-white/40 rounded" />)}
        </div>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-0">
        <div className="bg-slate-700 p-3 flex flex-col justify-center space-y-1.5">
          <div className="h-3 bg-white/90 rounded w-4/5" />
          <div className="h-3 bg-white/70 rounded w-3/4" />
          <div className="h-2 bg-white/40 rounded w-full" />
          <div className="h-2 bg-white/40 rounded w-5/6" />
          <div className="mt-2 h-5 w-14 bg-blue-500 rounded" />
        </div>
        <div className="bg-blue-50 p-2 grid grid-cols-2 gap-1.5 content-start pt-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded shadow-sm p-1.5 space-y-1">
              <div className="h-4 bg-slate-200 rounded" />
              <div className="h-1.5 bg-slate-300 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  portfolio: () => (
    <div className="w-full h-full bg-gray-950 flex flex-col">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 shrink-0">
        <span className="w-2 h-2 rounded-full bg-red-500" />
        <span className="w-2 h-2 rounded-full bg-yellow-500" />
        <span className="w-2 h-2 rounded-full bg-green-500" />
        <div className="flex-1 mx-2 h-3 rounded-full bg-gray-700" />
      </div>
      <div className="flex-1 p-3 space-y-2">
        <div className="flex justify-between items-center">
          <div className="h-3 bg-white/80 rounded w-16" />
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => <div key={i} className="h-2 w-8 bg-white/30 rounded" />)}
          </div>
        </div>
        <div className="text-center py-1 space-y-1">
          <div className="h-4 bg-blue-400/80 rounded mx-auto w-2/3" />
          <div className="h-2 bg-white/30 rounded mx-auto w-1/2" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            "bg-blue-800", "bg-purple-800", "bg-cyan-800",
            "bg-indigo-800", "bg-blue-900", "bg-slate-700",
          ].map((bg, i) => (
            <div key={i} className={`${bg} rounded aspect-square flex items-end p-1`}>
              <div className="h-1.5 bg-white/50 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  restaurant: () => (
    <div className="w-full h-full bg-amber-950 flex flex-col">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-amber-900 shrink-0">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="w-2 h-2 rounded-full bg-green-400" />
        <div className="flex-1 mx-2 h-3 rounded-full bg-amber-800" />
      </div>
      <div className="flex-1 p-3 space-y-2">
        <div className="h-10 bg-amber-800/60 rounded flex items-center justify-center">
          <div className="h-3 w-20 bg-amber-200/80 rounded" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {["bg-orange-700", "bg-red-800", "bg-amber-700", "bg-orange-800", "bg-red-700", "bg-amber-800"].map((bg, i) => (
            <div key={i} className={`${bg} rounded p-1.5 space-y-1`}>
              <div className="h-6 bg-black/20 rounded" />
              <div className="h-1.5 bg-amber-200/60 rounded w-3/4" />
              <div className="h-1.5 bg-amber-400/80 rounded w-1/2" />
            </div>
          ))}
        </div>
        <div className="flex gap-2 justify-center">
          <div className="h-5 w-16 bg-orange-500 rounded" />
          <div className="h-5 w-16 bg-amber-700 rounded" />
        </div>
      </div>
    </div>
  ),

  ecommerce: () => (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 shrink-0">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="w-2 h-2 rounded-full bg-green-400" />
        <div className="flex-1 mx-2 h-3 rounded-full bg-gray-200" />
      </div>
      <div className="h-5 bg-blue-600 flex items-center px-3 gap-2 shrink-0">
        <div className="h-2.5 w-12 bg-white/90 rounded" />
        <div className="flex-1 h-3 mx-2 bg-white/80 rounded" />
        <div className="h-3 w-3 bg-white/60 rounded" />
      </div>
      <div className="flex-1 p-2 space-y-1.5">
        <div className="h-2 bg-blue-200 rounded w-1/3" />
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border border-gray-100 rounded overflow-hidden">
              <div className="h-8 bg-gray-100" />
              <div className="p-1 space-y-0.5">
                <div className="h-1.5 bg-gray-400 rounded w-full" />
                <div className="h-2 bg-blue-500 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  promote: () => (
    <div className="w-full h-full bg-indigo-950 flex flex-col">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-indigo-900 shrink-0">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="w-2 h-2 rounded-full bg-green-400" />
        <div className="flex-1 mx-2 h-3 rounded-full bg-indigo-700" />
      </div>
      <div className="flex-1 p-3 space-y-2">
        <div className="h-12 bg-indigo-800 rounded flex flex-col items-center justify-center gap-1">
          <div className="h-3 bg-white/90 rounded w-1/2" />
          <div className="h-1.5 bg-indigo-300/60 rounded w-2/3" />
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bg-indigo-800/60 rounded p-2 space-y-1">
              <div className="flex gap-1 items-center">
                <div className="h-3 w-3 bg-indigo-400 rounded" />
                <div className="h-1.5 bg-white/50 rounded flex-1" />
              </div>
              <div className="h-1.5 bg-white/30 rounded w-3/4" />
            </div>
          ))}
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-1 h-12 bg-indigo-700/60 rounded overflow-hidden">
              <div className="h-7 bg-indigo-600/60" />
              <div className="p-1">
                <div className="h-1.5 bg-white/40 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  product: () => (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 shrink-0">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="w-2 h-2 rounded-full bg-green-400" />
        <div className="flex-1 mx-2 h-3 rounded-full bg-gray-200" />
      </div>
      <div className="flex-1 grid grid-cols-2 gap-0">
        <div className="bg-amber-50 p-3 flex items-center justify-center">
          <div className="w-full aspect-square bg-amber-200 rounded-lg flex items-center justify-center">
            <div className="w-2/3 h-2/3 bg-amber-300 rounded-lg" />
          </div>
        </div>
        <div className="p-3 flex flex-col justify-center space-y-1.5">
          <div className="h-1.5 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-800 rounded w-full" />
          <div className="h-3 bg-gray-800 rounded w-3/4" />
          <div className="h-2 bg-gray-400 rounded w-full" />
          <div className="h-2 bg-gray-400 rounded w-5/6" />
          <div className="h-4 bg-amber-500 rounded w-full mt-2" />
        </div>
      </div>
    </div>
  ),

  fullstack: () => (
    <div className="w-full h-full bg-gray-900 flex flex-col">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 shrink-0">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="w-2 h-2 rounded-full bg-green-400" />
        <div className="flex gap-1.5 ml-2">
          {["server.ts", "api.ts", "db.ts"].map((f) => (
            <div key={f} className="px-2 py-0.5 bg-gray-700 rounded-t text-[8px] text-gray-300">{f}</div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-3 space-y-1.5 overflow-hidden">
        <div className="flex gap-1.5 items-center">
          <div className="h-1.5 w-10 bg-purple-400 rounded" />
          <div className="h-1.5 w-8 bg-white/60 rounded" />
          <div className="h-1.5 w-8 bg-purple-400 rounded" />
          <div className="h-1.5 w-12 bg-green-400 rounded" />
        </div>
        <div className="flex gap-1.5 items-center">
          <div className="h-1.5 w-8 bg-blue-400 rounded" />
          <div className="h-1.5 w-6 bg-cyan-300 rounded" />
          <div className="h-1.5 w-4 bg-white/60 rounded" />
          <div className="h-1.5 w-16 bg-yellow-300 rounded" />
        </div>
        <div className="h-px bg-gray-700 my-1" />
        <div className="flex gap-1 items-center flex-wrap">
          <div className="h-1.5 w-6 bg-blue-400 rounded" />
          <div className="h-1.5 w-8 bg-white/60 rounded" />
          <div className="h-1.5 w-4 bg-yellow-300 rounded" />
          <div className="h-1.5 w-20 bg-green-400 rounded" />
        </div>
        <div className="pl-3 space-y-1">
          <div className="flex gap-1.5 items-center">
            <div className="h-1.5 w-8 bg-blue-400 rounded" />
            <div className="h-1.5 w-6 bg-cyan-300 rounded" />
            <div className="h-1.5 w-4 bg-white/60 rounded" />
            <div className="h-1.5 w-10 bg-purple-400 rounded" />
          </div>
          <div className="flex gap-1.5 items-center">
            <div className="h-1.5 w-6 bg-cyan-300 rounded" />
            <div className="h-1.5 w-4 bg-white/60 rounded" />
            <div className="h-1.5 w-8 bg-yellow-300 rounded" />
          </div>
        </div>
        <div className="h-px bg-gray-700 my-1" />
        <div className="flex gap-1.5 items-center">
          <div className="h-1.5 w-6 bg-blue-400 rounded" />
          <div className="h-1.5 w-8 bg-white/60 rounded" />
          <div className="h-1.5 w-6 bg-yellow-300 rounded" />
          <div className="h-1.5 w-6 bg-white/60 rounded" />
          <div className="h-1.5 w-8 bg-orange-400 rounded" />
        </div>
        <div className="mt-3 flex gap-2">
          <div className="flex-1 h-5 bg-green-900/60 border border-green-500/30 rounded px-1.5 flex items-center gap-1">
            <div className="h-1.5 w-1.5 bg-green-400 rounded-full" />
            <div className="h-1.5 flex-1 bg-green-400/60 rounded" />
          </div>
        </div>
      </div>
    </div>
  ),

  seo: () => (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 shrink-0">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="w-2 h-2 rounded-full bg-green-400" />
        <div className="flex-1 mx-2 h-3 bg-white border border-gray-300 rounded-full px-2 flex items-center">
          <div className="h-1.5 w-full bg-gray-200 rounded" />
        </div>
      </div>
      <div className="flex-1 p-3 space-y-1.5">
        <div className="h-3 bg-gray-200 rounded w-1/3 mb-3" />
        {[
          { w: "3/4", score: "bg-green-500" },
          { w: "2/3", score: "bg-green-500" },
          { w: "full", score: "bg-yellow-500" },
          { w: "4/5", score: "bg-green-500" },
        ].map((item, i) => (
          <div key={i} className="border border-gray-100 rounded p-2 space-y-1">
            <div className="flex justify-between items-center">
              <div className={`h-2 ${item.score} rounded w-2`} />
              <div className={`h-1.5 bg-blue-600 rounded w-${item.w}`} />
              <div className="h-1.5 bg-gray-200 rounded w-8" />
            </div>
            <div className="h-1.5 bg-gray-200 rounded w-full" />
          </div>
        ))}
      </div>
    </div>
  ),

  consult: () => (
    <div className="w-full h-full bg-blue-950 flex flex-col items-center justify-center gap-3 p-4">
      <div className="w-10 h-10 rounded-full bg-blue-400/30 flex items-center justify-center">
        <div className="text-lg">💬</div>
      </div>
      <div className="space-y-1 text-center">
        <div className="h-2.5 bg-white/80 rounded w-20 mx-auto" />
        <div className="h-1.5 bg-white/40 rounded w-28 mx-auto" />
        <div className="h-1.5 bg-white/40 rounded w-24 mx-auto" />
      </div>
      <div className="h-6 w-20 bg-blue-500 rounded" />
    </div>
  ),
};

export default function ServiceMockup({ category }: Props) {
  const MockupComponent = mockups[category] || mockups["landing"];
  return (
    <div className="w-full h-full overflow-hidden rounded-t">
      <MockupComponent />
    </div>
  );
}
