import 'package:flutter/material.dart';
import 'package:kidergarten/pages/login_page.dart';
import 'package:kidergarten/pages/signup_page.dart';
import 'package:kidergarten/components/my_button.dart';


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
                title: 'Sign up',
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) =>
                          SignupPage(), // Set true for Parent Login
                    ),
                  );
                },
              ),
              Mybutton(
                title: 'Login',
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) =>
                            LoginPage() // Set true for Parent Login
                        ),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}