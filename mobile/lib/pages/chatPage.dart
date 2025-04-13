import 'package:flutter/material.dart';
import 'package:kidergarten/components/studentCard.dart';
import 'package:kidergarten/pages/chatDetailsPage.dart';


class ChatPage extends StatelessWidget {
  final List<Map<String, dynamic>> students = [
    {"name": "Lisie Alexander", "age": 6, "gender": "Female"},
    {"name": "Albert Flores", "age": 5, "gender": "Male"},
    {"name": "Jerome Bell", "age": 6, "gender": "Male"},
    {"name": "Theresa Webb", "age": 5, "gender": "Female"},
    {"name": "Floyd Miles", "age": 5, "gender": "Male"},
    {"name": "Camcron Williamson", "age": 6, "gender": "Male"},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Chat")),
      body: ListView.builder(
        itemCount: students.length,
        itemBuilder: (context, index) {
          var student = students[index];
          return GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => ChatDetailPage(studentName: student['name']),
                ),
              );
            },
            child: StudentCard(
              name: student['name'],
              age: student['age'],
              gender: student['gender'],
            ),
          );
        },
      ),
    );
  }
}
