import 'package:flutter/material.dart';
import 'package:kidergarten/pages/chat_page.dart';
import 'package:kidergarten/pages/settings.dart';
import 'package:kidergarten/pages/teacher_dashboard.dart';

class NavigationSpine extends StatefulWidget {
  const NavigationSpine({super.key});

  @override
  State<NavigationSpine> createState() => _NavigationSpineState();
}

class _NavigationSpineState extends State<NavigationSpine> {
  int _currentIndex = 0;

  final List<Widget> _pages = [
    TeacherDashboard(),
    ChatPage(),
    SettingsPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(child: _pages[_currentIndex]),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        selectedItemColor: const Color(0xFF7B61FF),
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.chat_bubble), label: 'Chat'),
          BottomNavigationBarItem(
              icon: Icon(Icons.settings), label: 'Settings'),
        ],
      ),
    );
  }
}
