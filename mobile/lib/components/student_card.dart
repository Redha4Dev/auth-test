import 'package:flutter/material.dart';

class StudentCard extends StatelessWidget {
  final String name;

  const StudentCard({super.key, required this.name});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: ListTile(
        leading: Padding(
          padding: const EdgeInsets.all(5),
          child: const CircleAvatar(
            backgroundImage: AssetImage('assets/boyAvatar.png'),
            radius: 30,
          ),
        ),
        title: Text("Full Name: $name"),
        trailing: const Icon(Icons.more_vert),
      ),
    );
  }
}
