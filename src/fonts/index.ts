import localFont from 'next/font/local';

const fontTTInterphasesProVar = localFont({
  src: [
    { path: './TT Interphases Pro Trial Variable.ttf', style: 'normal' }
  ],
  variable: '--font-primary',
  display: 'swap',
});

const fontTTInterphasesProMono = localFont({
  src: [
    { path: './TT Interphases Pro Mono Trial Var Roman.ttf', style: 'normal' },
    { path: './TT Interphases Pro Mono Trial Var Italic.ttf', style: 'italic' }
  ],
  variable: '--font-secondary',
  display: 'swap',
});

export { fontTTInterphasesProVar, fontTTInterphasesProMono };
