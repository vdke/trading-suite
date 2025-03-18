# Documentazione: Menu di Navigazione Principale

## Panoramica
Il componente `MainNavigation` fornisce un sistema di navigazione completo e responsive per l'applicazione TradingSuite AI. È progettato per essere accessibile da tutte le pagine dell'applicazione e si adatta automaticamente a diverse dimensioni di schermo.

## Caratteristiche
- **Design Responsive**: Si adatta automaticamente tra desktop e mobile
- **Navigazione Intuitiva**: Evidenziazione automatica della voce di menu attiva
- **Integrazione nel Layout**: Implementato come header sticky nel layout principale

## Implementazione

### File
- `components/main-navigation.tsx`: Componente principale di navigazione
- `app/layout.tsx`: Integrazione nel layout principale dell'applicazione

### Struttura
Il componente è strutturato in diverse parti:
1. **Header principale**: Contiene il logo e la navigazione
2. **DesktopNav**: Navigazione orizzontale per schermi desktop
3. **MobileNav**: Menu a scomparsa laterale per dispositivi mobili
4. **Avatar utente**: Accesso rapido al profilo

### Voci di Menu
- Home
- Test
- Ripasso
- Database
- AI
- Impostazioni
- Profilo

## Utilizzo

```tsx
// In app/layout.tsx
import MainNavigation from "@/components/main-navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="flex min-h-screen flex-col">
            <MainNavigation />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
