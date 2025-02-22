import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width; // Gives the width
    double screenHeight =
        MediaQuery.of(context).size.height; // Gives the height

    return Scaffold(
      body: Container(
        width: screenWidth,
        decoration: BoxDecoration(
            gradient: LinearGradient(colors: [
          Color.fromARGB(255, 79, 41, 159),
          Color.fromARGB(255, 2 + 11 * 16, 10 * 16 + 2, 14 * 16 + 3)
        ], begin: Alignment.topCenter, end: Alignment.bottomCenter)),
        child: Stack(
          alignment: Alignment.bottomCenter,
          children: [
            Container(
              height: screenHeight * .7,
              decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(15),
                      topRight: Radius.circular(15))),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SizedBox(
                  height: screenHeight * .1,
                ),
                Image.asset(
                  "assets/tableau.png",
                  scale: 1.5,
                ),
                SizedBox(
                  height: screenHeight * .1,
                ),
                Text(
                  "Welcome Back",
                  style: TextStyle(
                      color: Color.fromARGB(255, 79, 41, 159), fontSize: 35),
                ),
                Text(
                  "Log into your account",
                  style: TextStyle(
                      color: Color.fromARGB(255, 139, 139, 139), fontSize: 15),
                ),
                SizedBox(
                  height: screenHeight * .1,
                ),
                
              ],
            ),
          ],
        ),
      ),
    );
  }
}
