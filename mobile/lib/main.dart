import 'package:flutter/material.dart';
import 'package:kidergarten/pages/settings.dart';
import 'package:kidergarten/pages/settingsPage.dart';
import 'package:kidergarten/pages/welcome_page.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: WelcomePage(),
      debugShowCheckedModeBanner: false,
    );
  }
}
