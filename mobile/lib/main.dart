import 'package:flutter/material.dart';
import 'package:kidergarten/pages/login_page.dart';
import 'package:kidergarten/pages/signup_page.dart';
import 'package:kidergarten/pages/testpage.dart';
import 'package:kidergarten/pages/welcome_page.dart';
import 'package:kidergarten/services/api_service.dart';

void main() {

  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: WelcomePage(),
      debugShowCheckedModeBanner: false,
    );
  }
}
