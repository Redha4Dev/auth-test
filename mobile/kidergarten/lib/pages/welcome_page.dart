import 'package:flutter/material.dart';
import 'package:kidergarten/components/myButton.dart';

class WelcomePage extends StatefulWidget {
  const WelcomePage({super.key});

  @override
  State<WelcomePage> createState() => _WelcomePageState();
}

class _WelcomePageState extends State<WelcomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
            gradient: LinearGradient(colors: [
          Color.fromARGB(255, 79, 41, 159),
          Color.fromARGB(255, 2 + 11 * 16, 10 * 16 + 2, 14 * 16 + 3)
        ], begin: Alignment.topCenter, end: Alignment.bottomCenter)),
        child: Center(
          child: Column(
            children: [
              SizedBox(
                height: 150,
              ),
              Image.asset(
                "assets/family_picture.png",
                scale: 1.2,
              ),
              SizedBox(
                height: 150,
              ),
              Mybutton(
                title: 'I am a Teacher',
              ),
              Mybutton(
                title: 'I am a Parent',
              ),
            ],
          ),
        ),
      ),
    );
  }
}
