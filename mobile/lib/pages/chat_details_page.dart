import 'package:flutter/material.dart';
import 'package:kidergarten/services/api_service.dart';
import 'package:kidergarten/global.dart';

class ChatDetailPage extends StatefulWidget {
  final String studentName;
  final String studentId;

  const ChatDetailPage({
    super.key,
    required this.studentName,
    required this.studentId,
  });

  @override
  State<ChatDetailPage> createState() => _ChatDetailPageState();
}

class _ChatDetailPageState extends State<ChatDetailPage> {
  final TextEditingController _controller = TextEditingController();
  final ApiService _apiService = ApiService();
  bool _isLoading = true;
  String? _teacherId;

  @override
  void initState() {
    super.initState();
    _initializeChat();
  }

  Future<void> _initializeChat() async {
    setState(() => _isLoading = true);

    // Regular student chat flow
    if (widget.studentId.isEmpty) {
      setState(() => _isLoading = false);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Invalid student information')),
        );
      }
      return;
    }

    // First get the kid's details to find their teacher
    final kidDetails = await _apiService.getKidDetails(
      name: widget.studentName,
      id: widget.studentId,
    );

    if (kidDetails != null) {
      print('📝 Kid Details: $kidDetails');
      // Access teacher data safely
      if (kidDetails['teacher'] is Map) {
        final teacherData = kidDetails['teacher'] as Map<String, dynamic>;
        _teacherId =
            teacherData['id']?.toString() ?? teacherData['_id']?.toString();
        print('👨‍🏫 Teacher ID: $_teacherId');
        setState(() => _isLoading = false);
      } else {
        print('❌ Invalid teacher data format: ${kidDetails['teacher']}');
        setState(() => _isLoading = false);
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Invalid teacher information format')),
          );
        }
      }
    } else {
      setState(() => _isLoading = false);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Could not find student information')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Chat with ${widget.studentName}"),
        backgroundColor: const Color(0xFF7B61FF),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : const Center(
              child: Text(
                'Chat functionality is currently unavailable',
                style: TextStyle(fontSize: 16),
              ),
            ),
    );
  }
}
