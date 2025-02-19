import 'package:flutter/material.dart';
import 'package:kidergarten/components/myButton.dart';

class Testpage extends StatefulWidget {
  const Testpage({super.key});

  @override
  State<Testpage> createState() => _TestpageState();
}

class _TestpageState extends State<Testpage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(children: [
          Mybutton(title: "azl,kflzeknf"),
          Mybutton(title: "aymen gay")
        ]),
      ),
    );
  }
}
