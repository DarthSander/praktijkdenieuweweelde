"use client";

type Props = {
  filename: string;
  data: unknown;
};

export default function SubmissionActions({ filename, data }: Props) {
  function downloadJson() {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-wrap gap-3 print:hidden">
      <button
        type="button"
        onClick={() => window.print()}
        className="px-4 py-2.5 rounded-full text-sm font-semibold btn-primary transition-all"
      >
        Printen / opslaan als PDF
      </button>
      <button
        type="button"
        onClick={downloadJson}
        className="px-4 py-2.5 rounded-full text-sm font-semibold border border-[#C4A4A0] text-[#946B66] bg-white hover:bg-[#F5F0EB] transition-all"
      >
        Download (JSON)
      </button>
    </div>
  );
}
