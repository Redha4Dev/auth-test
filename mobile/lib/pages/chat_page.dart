import 'package:flutter/material.dart';
import 'package:kidergarten/components/student_card.dart';
import 'package:kidergarten/components/admin_card.dart';
import 'package:kidergarten/pages/chat_details_page.dart';
import 'package:kidergarten/global.dart'; // Make sure this is imported
import 'package:shared_preferences/shared_preferences.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class ChatPage extends StatefulWidget {
  @override
  State<ChatPage> createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  String? _schoolName;

  @override
  void initState() {
    super.initState();
    _loadSchoolName();
  }

  Future<void> _loadSchoolName() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');

    print('\n🔍 DEBUG: PROFILE DATA 🔍');
    print('----------------------------------------');

    // Print global parent data
    print('📦 Global Parent Data:');
    if (globalParentData != null) {
      final parentData = globalParentData?['PARENT'];
      print('  PARENT data: $parentData');

      if (parentData != null && parentData is Map<String, dynamic>) {
        print('  🆔 ID: ${parentData['_id']}');
        print('  👤 Name: ${parentData['name']}');
        print('  📧 Email: ${parentData['email']}');
        print('  📱 Phone: ${parentData['phone']}');
        print('  🏫 School: ${parentData['school']}');
        print('  👶 Kids: ${parentData['kids']}');
        print('  📍 Address: ${parentData['address']}');
        print('  ⚧ Gender: ${parentData['gender']}');
        print('  🎭 Role: ${parentData['role']}');
      }
    } else {
      print('  ❌ No global parent data available');
    }

    // Print token data
    print('\n🎟 Token Data:');
    if (token != null && token.isNotEmpty) {
      try {
        final decodedToken = JwtDecoder.decode(token);
        print('  Decoded token: $decodedToken');

        // Print specific token fields
        print('  🆔 User ID: ${decodedToken['id']}');
        print('  👤 Name: ${decodedToken['name']}');
        print('  🏫 School: ${decodedToken['school']}');
        print('  🎭 Role: ${decodedToken['role']}');
      } catch (e) {
        print('  ❌ Error decoding token: $e');
      }
    } else {
      print('  ❌ No token available');
    }

    print('----------------------------------------\n');

    if (token != null) {
      try {
        final decodedToken = JwtDecoder.decode(token);
        final school = decodedToken['school'];
        if (school != null && school.toString().isNotEmpty) {
          setState(() {
            _schoolName = school.toString();
          });
        } else {
          print('⚠️ No school name in token, using default');
          setState(() {
            _schoolName = 'School Administration';
          });
        }
      } catch (e) {
        print('❌ Error decoding token: $e');
        setState(() {
          _schoolName = 'School Administration';
        });
      }
    } else {
      print('⚠️ No token found');
      setState(() {
        _schoolName = 'School Administration';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final kids = globalParentData?['PARENT']?['kids'] as List<dynamic>? ?? [];
    final school = _schoolName;

    if (school == null) {
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text("Chat"),
        backgroundColor: const Color(0xFF7B61FF),
      ),
      body: Column(
        children: [
          // Admin Card
          AdminCard(
            schoolName: school,
            onTap: () {
              print('no chat yet');
            },
          ),
          // Divider
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 12),
            child: Divider(height: 1),
          ),
          // Kids List
          Expanded(
            child: kids.isEmpty
                ? const Center(
                    child: Text(
                      'No students found',
                      style: TextStyle(fontSize: 18),
                    ),
                  )
                : ListView(
                    padding: const EdgeInsets.all(12),
                    children: (kids).map((student) {
                      final s = student as Map<String, dynamic>;
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 8),
                        child: GestureDetector(
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (_) => ChatDetailPage(
                                  studentName: s['name'] ?? 'No name',
                                  studentId: s['id']?.toString() ?? '',
                                ),
                              ),
                            );
                          },
                          child: StudentCard(
                            name: s['name'] ?? 'No name',
                          ),
                        ),
                      );
                    }).toList(),
                  ),
          ),
        ],
      ),
    );
  }
}
