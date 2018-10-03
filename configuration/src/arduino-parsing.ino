/*
  Receives from the hardware serial, sends to software serial.
  Receives from software serial, sends to hardware serial.

  The circuit:
   RX is digital pin 10 (connect to TX of other device)
   TX is digital pin 11 (connect to RX of other device)

  Not all pins on the Leonardo and Micro support change interrupts,
  so only the following can be used for RX:
  8, 9, 10, 11, 14 (MISO), 15 (SCK), 16 (MOSI).
*/
#include <SoftwareSerial.h>
#include <Keyboard.h>

SoftwareSerial mySerial(10, 11); // RX, TX

void setup() {

  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  // initialize control over the keyboard:
  Keyboard.begin();
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  delay(2000);
  Serial.println("Goodnight moon!");

  // set the data rate for the SoftwareSerial port
  mySerial.begin(9600);
  mySerial.println("Hello, world?");
}

void loop() { // run over and over
  if (mySerial.available()) {
    // Serial.write(mySerial.read());
    // read incoming serial data:
    char inChar = mySerial.read();
    //     char inChar = 'a';
    // Type the ASCII value received:
    //    delay(1000);
    Keyboard.println(inChar);
  }
  //  if (Serial.available()) {
  //    mySerial.write(Serial.read());
  //  }
}

