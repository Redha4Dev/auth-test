import 'package:flutter/material.dart';

class Listtile extends StatefulWidget {
  const Listtile({super.key});

  @override
  State<Listtile> createState() => _ListtileState();
}

class _ListtileState extends State<Listtile> {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.amber,
      child: Text("data"),
    );
  }
}
