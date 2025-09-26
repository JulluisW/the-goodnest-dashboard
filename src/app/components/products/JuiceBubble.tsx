export default function JuiceBubble({
  colors = ["#22c55e", "#fde047", "#f43f5e"],
}: {
  colors?: [string, string, string];
}) {
  const [c1, c2, c3] = colors;

  return (
    <div
      className="w-20 h-20 bg-animated-gradient rounded-full shadow-xl border-[0.25px] border-gray-400"
      style={
        {
          "--color1": c1,
          "--color2": c2,
          "--color3": c3,
        } as React.CSSProperties
      }
    />
  );
}
