

// ############# LIBRARIES ############### //
#include <SPI.h>
#include <MFRC522.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// ############# ARQUIVOS ############### //
#include "sendMSG.h"
//#include "RFID.h"

// ############# VARIABLES ############### //
#define RST_PIN    D3    
#define SS_PIN     D8   
#define LED        D1

//Criando o servidor web na porta 80
WiFiServer server(80);

MFRC522 mfrc522(SS_PIN, RST_PIN); // Create MFRC522 instance

//#define SERVER_IP "10.0.1.7:9080" // PC address with emulation on host
#define SERVER_IP "10.0.0.122"

#ifndef STASSID
#define STASSID "HOME(R&I)"
#define STAPSK  "33264672(!@#)"
#endif



void setup() {
  Serial.begin(115200);
  SPI.begin();      // Inicia  SPI bus
  mfrc522.PCD_Init();   // Inicia MFRC522
  Serial.println("Aproxime o seu cartao do leitor...");
  Serial.println();
  digitalWrite(LED_BUILTIN, HIGH);
  pinMode(D1, OUTPUT);
  pinMode(4, OUTPUT);
  digitalWrite(4, HIGH);

  Serial.println();
  Serial.println();
  Serial.println();

  WiFi.begin(STASSID, STAPSK);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());

  //Iniciando SERVER 
  server.begin();
}

void loop() {
        webServer();

  
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
        digitalWrite(D1, HIGH);     // LIGA LED OU/ ativa rele, abre trava solenoide
        delay(3000);              // DELAY /espera 3 segundos       
        digitalWrite(D1, LOW);  // DESlIGA LED OU /desativa rele, fecha  trava solenoide
      }

  
  sendMSG(conteudo.substring(1));
  delay(10000);

  
}

    void webServer(){
        //Verificando se o servidor esta pronto.
      WiFiClient client = server.available();
      if (!client) {
        return;
      }
        //Verificando se o servidor recebeu alguma requisicao
      while (!client.available()) {
        delay(1);
      }
        //Obtendo a requisicao vinda do browser
      String req = client.readStringUntil('\r');
      
      //Sugestao dada por Enrico Orlando
      if(req == "POST /favicon.ico HTTP/1.1"){
          req = client.readStringUntil('\r');
      }
      
      client.flush();

      //Iniciando o buffer que ira conter a pagina HTML que sera enviada para o browser.
  String buf = "";
  buf += "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<!DOCTYPE HTML>\r\n<html>\r\n";
  buf += "<head> ";
  buf += "<meta charset='UTF-8'> ";
  buf += "<meta http-equiv='cache-control' content='max-age=0' /> ";
  buf += "<meta http-equiv='cache-control' content='no-cache' /> ";
  buf += "<meta http-equiv='expires' content='0' /> ";
  buf += "<meta http-equiv='expires' content='Tue, 01 Jan 1980 1:00:00 GMT' /> ";
  buf += "<meta http-equiv='pragma' content='no-cache' /> ";
  buf += "<title>Automa&ccedil;&atilde;o Residencial</title> ";
  buf += "<style> ";
  buf += "body{font-family:Open Sans; color:#555555;} ";
  buf += "h1{font-size:24px; font-weight:normal; margin:0.4em 0;} ";
  buf += ".container { width: 100%; margin: 0 auto; } ";
  buf += ".container .row { float: left; clear: both; width: 100%; } ";
  buf += ".container .col { float: left; margin: 0 0 1.2em; padding-right: 1.2em; padding-left: 1.2em; } ";
  buf += ".container .col.four, .container .col.twelve { width: 100%; } ";
  buf += "@media screen and (min-width: 767px) { ";
  buf += ".container{width: 100%; max-width: 1080px; margin: 0 auto;} ";
  buf += ".container .row{width:100%; float:left; clear:both;} ";
  buf += ".container .col{float: left; margin: 0 0 1em; padding-right: .5em; padding-left: .5em;} ";
  buf += ".container .col.four { width: 50%; } ";
  buf += ".container .col.tweleve { width: 100%; } ";
  buf += "} ";
  buf += "* {-moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box;} ";
  buf += "a{text-decoration:none;} ";
  buf += ".btn {font-size: 18px; white-space:nowrap; width:100%; padding:.8em 1.5em; font-family: Open Sans, Helvetica,Arial,sans-serif; ";
  buf += "line-height:18px; display: inline-block;zoom: 1; color: #fff; text-align: center; position:relative; ";
  buf += "-webkit-transition: border .25s linear, color .25s linear, background-color .25s linear; ";
  buf += "transition: border .25s linear, color .25s linear, background-color .25s linear;} ";
  buf += ".btn.btn-sea{background-color: #08bc9a; border-color: #08bc9a; -webkit-box-shadow: 0 3px 0 #088d74; box-shadow: 0 3px 0 #088d74;} ";
  buf += ".btn.btn-sea:hover{background-color:#01a183;} ";
  buf += ".btn.btn-sea:active{ top: 3px; outline: none; -webkit-box-shadow: none; box-shadow: none;} ";
  buf += "</style> ";
  buf += "</head> ";
  buf += "<body> ";
  buf += "<div class='container'> ";
  buf += "<div class='row'> ";
  buf += "<div class='col twelve'> ";
  buf += "<p align='center'><font size='10'>Controle de l&acirc;mpadas</font></p> ";
  buf += "</div> ";
  buf += "</div> ";
  buf += "<div class='row'> ";
  buf += "<div class='col four'> ";
  buf += "<a href='?f=on' class='btn btn-sea'>Ligar</a> ";
  buf += "</div> ";
  buf += "<div class='col four'> ";
  buf += "<a href='?f=off' class='btn btn-sea'>Desligar</a> ";
  buf += "</div> ";
  buf += "</div> ";
  buf += "<div class='col twelve'> ";  
  buf += "</div> ";
  buf += "</div> ";
  buf += "</body> ";
  buf += "</html> ";

  //Enviando para o browser a 'pagina' criada.
  client.print(buf);
  client.flush();
      
       //Analisando a requisicao recebida para decidir se liga ou desliga a lampada
      if (req.indexOf("on") != -1){
        digitalWrite(4, LOW);
      }else if (req.indexOf("off") != -1){
        digitalWrite(4, HIGH);
      }else{
        //Requisicao invalida!
        client.stop();
      }
    
}
