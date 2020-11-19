// ############# LIBRARIES ############### //
#include <SPI.h>
#include <MFRC522.h>

// ############# VARIABLES ############### //
#define RST_PIN    D3    
#define SS_PIN     D8   
#define LED        D1

MFRC522 mfrc522(SS_PIN, RST_PIN); // Create MFRC522 instance

void RFID(){      
        // Procura por cartao RFID
      if ( ! mfrc522.PICC_IsNewCardPresent()){
        return;
      }
      // Seleciona o cartao RFID
      if ( ! mfrc522.PICC_ReadCardSerial()) 
      {
        return;
      }
      //Mostra UID na serial
      Serial.print("UID da tag :");
      String conteudo= "";
      byte letra;
      for (byte i = 0; i < mfrc522.uid.size; i++) 
      {
         Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
         Serial.print(mfrc522.uid.uidByte[i], HEX);
         conteudo.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
         conteudo.concat(String(mfrc522.uid.uidByte[i], HEX));
      }
      Serial.println();
      Serial.print("Mensagem : ");
      conteudo.toUpperCase();
      //Serial.println(conteudo.substring(1));
      if (conteudo.substring(1) == "74 71 53 73" || "E2 BA E0 2E") //UID 1 - Cartao
      {
        Serial.println("Liberado !");
        Serial.println();
        digitalWrite(4, LOW);        
        digitalWrite(D1, HIGH);     // LIGA LED OU/ ativa rele, abre trava solenoide
        delay(3000);              // DELAY /espera 3 segundos
        digitalWrite(4, HIGH);
        digitalWrite(D1, LOW);  // DESlIGA LED OU /desativa rele, fecha  trava solenoide
      }
 

   }
