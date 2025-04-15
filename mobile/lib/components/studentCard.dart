import 'package:flutter/material.dart';

class StudentCard extends StatelessWidget {
  final String name;
final int? age ;
 final  String? gender;

  const StudentCard(
      {super.key, required this.name, this.age, this.gender});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: ListTile(
        leading: const CircleAvatar(
          backgroundImage: AssetImage('assets/avatar.png'),
        ),
        title: Text("Full Name: $name"),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Age: $age"),
            Text("Gender: $gender"),
          ],
        ),
        trailing: const Icon(Icons.more_vert),
      ),
    );
  }
}
