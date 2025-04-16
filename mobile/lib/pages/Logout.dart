import 'package:flutter/material.dart';
import 'package:kidergarten/components/myButton.dart';

class LogoutPage extends StatelessWidget {
  const LogoutPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF5D33A4),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const CircleAvatar(
                radius: 50,
                backgroundColor: Colors.grey,
              ),
              const SizedBox(height: 40),
              const Text(
                'Do you really want\nto log out ?',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                  fontFamily: 'Serif',
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(height: 40),
              myOutlinedButton(

                text: 'No',
                onTap: (){},
              ),
              const SizedBox(height: 16),
              myOutlinedButton(

                text: 'No',
                onTap: (){},
              ),
            ],
          ),
        ),
      ),
    );
  }
}
