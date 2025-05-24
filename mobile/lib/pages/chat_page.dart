import 'package:flutter/material.dart';
import 'package:kidergarten/components/student_card.dart';
import 'package:kidergarten/pages/chat_details_page.dart';
import 'package:kidergarten/global.dart'; // Make sure this is imported

class ChatPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Get the kids list from the global state (same as teacher dashboard)
    final kids = globalParentData?['PARENT']?['kids'] as List<dynamic>? ?? [];

    return Scaffold(
      appBar: AppBar(title: Text("Chat")),
      body: ListView.builder(
        itemCount: kids.length,
        itemBuilder: (context, index) {
          final student = kids[index] as Map<String, dynamic>;
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
              name: student['name'] ?? 'No name',
              age: (student['age'] ?? '0').toString(),
              gender: student['gender'] ?? 'Unknown',
            ),
          );
        },
      ),
    );
  }
}