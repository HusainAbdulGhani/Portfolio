import { useEffect, useRef, useState } from 'react';

function PdfThumbnail({ file, title }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      try {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/build/pdf.worker.min.mjs',
          import.meta.url
        ).toString();

        const pdf = await pdfjsLib.getDocument(file).promise;
        const page = await pdf.getPage(1);
        const containerWidth = containerRef.current?.clientWidth || 300;
        const viewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        const context = canvas.getContext('2d');
        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        await page.render({
          canvasContext: context,
          viewport: scaledViewport,
          canvas,
        }).promise;

        if (!cancelled) setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      }
    };

    render();
    return () => {
      cancelled = true;
    };
  }, [file]);

  return (
    <div
      ref={containerRef}
      className="flex h-full min-h-[220px] w-full items-center justify-center bg-slate-900/80"
    >
      {status === 'loading' && (
        <span className="animate-pulse text-xs text-slate-500">Memuat pratinjau...</span>
      )}
      {status === 'error' && (
        <span className="px-4 text-center text-sm text-slate-500">Pratinjau tidak tersedia</span>
      )}
      <canvas
        ref={canvasRef}
        className={`h-full w-full object-contain object-top ${status !== 'ready' ? 'hidden' : ''}`}
        aria-label={title}
      />
    </div>
  );
}

export function CertificatePreview({ file, preview, title }) {
  if (preview) {
    return (
      <img
        src={preview}
        alt={title}
        className="h-full min-h-[220px] w-full object-contain object-top"
        loading="lazy"
      />
    );
  }

  return <PdfThumbnail file={file} title={title} />;
}
