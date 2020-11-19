// ############# VARIABLES ############### //
//#define SERVER_IP "10.0.1.7:9080" // PC address with emulation on host
#define SERVER_IP "10.0.0.122"


void sendMSG(String cartao){
      if ((WiFi.status() == WL_CONNECTED)){
   
      WiFiClient client;
      HTTPClient http;
  
      Serial.print("[HTTP] begin...\n");
      // configure traged server and url
      http.begin(client, "http://" SERVER_IP ":3000/sensors"); //HTTP
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  
      Serial.print("[HTTP] POST...\n");
      // start connection and send HTTP header and body
      String body = "id=7890&name=SENSORS&type=RFID&value="+cartao;
      int httpCode = http.POST(body);
  
      // httpCode will be negative on error
      if (httpCode > 0) {
        // HTTP header has been send and Server response header has been handled
        Serial.printf("[HTTP] POST... code: %d\n", httpCode);
  
        // file found at server
        if (httpCode == HTTP_CODE_OK) {
          const String& payload = http.getString();
          Serial.println("received payload:\n<<");
          Serial.println(payload);
          Serial.println(">>");
        }
      } else {
        Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
      }
  
      http.end();
    }
  }
