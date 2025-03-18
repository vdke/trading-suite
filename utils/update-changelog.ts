import fs from "fs"
import path from "path"
import { execSync } from "child_process"

/**
 * Tipo di modifica per il changelog
 */
type ChangeType = "Aggiunto" | "Modificato" | "Risolto" | "Rimosso"

/**
 * Interfaccia per una singola modifica
 */
interface Change {
  file: string
  description: string[]
  reason?: string
}

/**
 * Interfaccia per una versione del changelog
 */
interface ChangelogVersion {
  version: string
  date: string
  changes: Record<ChangeType, Change[]>
}

/**
 * Classe per gestire l'aggiornamento del changelog
 */
export class ChangelogUpdater {
  private changelogPath: string
  private currentChanges: ChangelogVersion

  /**
   * Costruttore
   * @param projectRoot - Percorso della radice del progetto
   */
  constructor(projectRoot: string = process.cwd()) {
    this.changelogPath = path.join(projectRoot, "CHANGELOG.md")

    // Inizializza la struttura per le modifiche correnti
    this.currentChanges = {
      version: this.getNextVersion(),
      date: new Date().toISOString().split("T")[0],
      changes: {
        Aggiunto: [],
        Modificato: [],
        Risolto: [],
        Rimosso: [],
      },
    }
  }

  /**
   * Ottiene la prossima versione basata sull'ultima versione nel changelog
   * @returns La prossima versione
   */
  private getNextVersion(): string {
    try {
      if (!fs.existsSync(this.changelogPath)) {
        return "1.0.0"
      }

      const content = fs.readFileSync(this.changelogPath, "utf-8")
      const versionMatch = content.match(/## \[Versione ([\d.]+)\]/)

      if (!versionMatch) {
        return "1.0.0"
      }

      const lastVersion = versionMatch[1]
      const [major, minor, patch] = lastVersion.split(".").map(Number)

      // Incrementa la versione patch di default
      return `${major}.${minor}.${patch + 1}`
    } catch (error) {
      console.error("Errore nel determinare la prossima versione:", error)
      return "1.0.0"
    }
  }

  /**
   * Aggiunge una modifica al changelog corrente
   * @param type - Tipo di modifica
   * @param file - File modificato
   * @param descriptions - Descrizioni delle modifiche
   * @param reason - Motivo della modifica
   */
  public addChange(type: ChangeType, file: string, descriptions: string[], reason?: string): void {
    this.currentChanges.changes[type].push({
      file,
      description: descriptions,
      reason,
    })
  }

  /**
   * Imposta manualmente la versione
   * @param version - Nuova versione
   */
  public setVersion(version: string): void {
    this.currentChanges.version = version
  }

  /**
   * Ottiene i file modificati dal git
   * @returns Array di file modificati
   */
  public getModifiedFiles(): string[] {
    try {
      const gitStatus = execSync("git status --porcelain").toString()
      return gitStatus
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => line.substring(3))
    } catch (error) {
      console.error("Errore nel recuperare i file modificati da git:", error)
      return []
    }
  }

  /**
   * Aggiorna il file changelog con le modifiche correnti
   */
  public updateChangelog(): void {
    try {
      let content = ""

      // Se il file non esiste, crea l'intestazione
      if (!fs.existsSync(this.changelogPath)) {
        content = "# Changelog TradingSuite AI\n\n"
        content += "Questo file contiene un registro di tutte le modifiche apportate ai file del progetto, "
        content += "inclusi i parametri modificati e le motivazioni delle modifiche.\n\n"
      } else {
        content = fs.readFileSync(this.changelogPath, "utf-8")
      }

      // Verifica se ci sono modifiche da aggiungere
      const hasChanges = Object.values(this.currentChanges.changes).some((changes) => changes.length > 0)

      if (!hasChanges) {
        console.log("Nessuna modifica da aggiungere al changelog.")
        return
      }

      // Crea la nuova sezione del changelog
      let newSection = `## [Versione ${this.currentChanges.version}] - ${this.currentChanges.date}\n\n`

      // Aggiungi le modifiche per ogni tipo
      for (const [type, changes] of Object.entries(this.currentChanges.changes)) {
        if (changes.length > 0) {
          newSection += `### ${type}\n`

          for (const change of changes) {
            newSection += `- \`${change.file}\`\n`

            for (const desc of change.description) {
              newSection += `  - ${desc}\n`
            }

            if (change.reason) {
              newSection += `  - Motivo: ${change.reason}\n`
            }

            newSection += "\n"
          }
        }
      }

      // Trova la posizione dopo l'intestazione per inserire la nuova sezione
      const headerEndPos = content.indexOf("\n\n") + 2
      const updatedContent = content.substring(0, headerEndPos) + newSection + content.substring(headerEndPos)

      // Scrivi il file aggiornato
      fs.writeFileSync(this.changelogPath, updatedContent, "utf-8")
      console.log(`Changelog aggiornato con la versione ${this.currentChanges.version}`)
    } catch (error) {
      console.error("Errore nell'aggiornamento del changelog:", error)
    }
  }

  /**
   * Avvia un processo interattivo per aggiungere modifiche
   */
  public async interactiveUpdate(): Promise<void> {
    // Questa funzione potrebbe essere implementata con una libreria come inquirer
    // per un'interfaccia interattiva da riga di comando
    console.log("Funzionalità interattiva non implementata. Usa i metodi addChange() e updateChangelog().")
  }
}

/**
 * Esempio di utilizzo:
 *
 * const updater = new ChangelogUpdater();
 *
 * updater.addChange(
 *   'Modificato',
 *   'components/trading-view.tsx',
 *   [
 *     'Migliorata la visualizzazione del grafico candlestick',
 *     'Aggiunto supporto per indicatori personalizzati'
 *   ],
 *   'Miglioramento dell\'esperienza utente'
 * );
 *
 * updater.updateChangelog();
 */
