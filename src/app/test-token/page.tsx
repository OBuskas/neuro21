import { TokenDisplay } from "@/components/neuro21/token-display";

export default function TestToken() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teste do TokenDisplay</h1>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Valor fixo (1234):</h2>
        <TokenDisplay balance={1234} className="text-xl" />
      </div>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Valor do mockUser (1247):</h2>
        <TokenDisplay balance={1247} className="text-xl" />
      </div>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Valor zero (0):</h2>
        <TokenDisplay balance={0} className="text-xl" />
      </div>
    </div>
  );
}
