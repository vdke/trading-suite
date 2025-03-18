#!/usr/bin/env node

import { ChangelogUpdater } from "../utils/update-changelog"
import readline from "readline"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const updater = new ChangelogUpdater()

/**
 * Chiede all'utente di inserire un input
 * @param question - Domanda da porre
 * @returns Promise con la risposta
 */
function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

/**
 * Funzione principale
 */
async function main() {
  console.log("=== Aggiornamento Changelog TradingSuite AI ===")

  // Ottieni i file modificati
  const modifiedFiles = updater.getModifiedFiles()
  console.log("\nFile modificati rilevati:")
  modifiedFiles.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`)
  })

  // Chiedi se si vuole specificare manualmente la versione
  const customVersion = await askQuestion("\nVuoi specificare manualmente la versione? (s/N): ")
  if (customVersion.toLowerCase() === "s") {
    const version = await askQuestion("Inserisci la nuova versione (es. 1.2.0): ")
    updater.setVersion(version)
  }

  let continueAdding = true

  while (continueAdding) {
    console.log("\n=== Aggiungi una modifica ===")

    // Seleziona il tipo di modifica
    console.log("Tipi di modifica:")
    console.log("1. Aggiunto")
    console.log("2. Modificato")
    console.log("3. Risolto")
    console.log("4. Rimosso")

    const typeChoice = await askQuestion("Seleziona il tipo di modifica (1-4): ")
    let changeType: "Aggiunto" | "Modificato" | "Risolto" | "Rimosso"

    switch (typeChoice) {
      case "1":
        changeType = "Aggiunto"
        break
      case "2":
        changeType = "Modificato"
        break
      case "3":
        changeType = "Risolto"
        break
      case "4":
        changeType = "Rimosso"
        break
      default:
        changeType = "Modificato"
    }

    // Seleziona il file
    let file: string
    if (modifiedFiles.length > 0) {
      const fileChoice = await askQuestion(
        `Seleziona il file (1-${modifiedFiles.length}) o inserisci un percorso personalizzato: `,
      )
      const fileIndex = Number.parseInt(fileChoice) - 1

      if (!isNaN(fileIndex) && fileIndex >= 0 && fileIndex < modifiedFiles.length) {
        file = modifiedFiles[fileIndex]
      } else {
        file = fileChoice
      }
    } else {
      file = await askQuestion("Inserisci il percorso del file: ")
    }

    // Raccogli le descrizioni
    const descriptions: string[] = []
    let addingDescriptions = true

    console.log("\nInserisci le descrizioni delle modifiche (linea vuota per terminare):")

    while (addingDescriptions) {
      const description = await askQuestion("- ")
      if (description.trim() === "") {
        addingDescriptions = false
      } else {
        descriptions.push(description)
      }
    }

    // Chiedi il motivo
    const reason = await askQuestion("\nMotivo della modifica (opzionale): ")

    // Aggiungi la modifica
    updater.addChange(changeType, file, descriptions, reason.trim() !== "" ? reason : undefined)

    // Chiedi se si vuole aggiungere un'altra modifica
    const addAnother = await askQuestion("\nVuoi aggiungere un'altra modifica? (s/N): ")
    continueAdding = addAnother.toLowerCase() === "s"
  }

  // Aggiorna il changelog
  updater.updateChangelog()

  console.log("\nChangelog aggiornato con successo!")
  rl.close()
}

main().catch((error) => {
  console.error("Errore durante l'aggiornamento del changelog:", error)
  rl.close()
  process.exit(1)
})
