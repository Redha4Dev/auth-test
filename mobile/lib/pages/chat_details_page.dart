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
  final List<Map<String, dynamic>> _messages = [];
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

    // For admin chat, get the admin's actual ID
    if (widget.studentId == 'admin') {
      print('🏫 Fetching admin ID for school: ${widget.studentName}');
      final adminId = await _apiService.getAdminIdForSchool(widget.studentName);

      if (adminId != null) {
        setState(() {
          _teacherId = adminId;
        });
        print('👨‍💼 Admin ID found: $_teacherId');
        await _loadMessages();
      } else {
        print('❌ Failed to get admin ID');
        setState(() {
          _isLoading = false;
        });
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text(
                  'Could not connect to administration. Please try again later.'),
              duration: Duration(seconds: 3),
            ),
          );
        }
      }
      return;
    }

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

        if (_teacherId != null) {
          await _loadMessages();
        } else {
          print('❌ No teacher ID found in: $teacherData');
          setState(() => _isLoading = false);
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                  content: Text('Could not find teacher information')),
            );
          }
        }
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

  Future<void> _loadMessages() async {
    if (_teacherId == null) {
      setState(() => _isLoading = false);
      return;
    }

    final userId = globalParentData?['PARENT']?['_id'];
    if (userId == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('User ID not found')),
      );
      setState(() => _isLoading = false);
      return;
    }

    final messages = await _apiService.getAllMessages(userId);
    if (messages != null) {
      setState(() {
        _messages.clear();
        _messages.addAll(messages.map((msg) => {
              "text": msg['message'],
              "isMe": msg['sender']['_id'] == userId,
              "timestamp": DateTime.parse(msg['sentAt']),
            }));
        _isLoading = false;
      });
    } else {
      setState(() => _isLoading = false);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Failed to load messages')),
        );
      }
    }
  }

  Future<void> _sendMessage(String text) async {
    if (text.trim().isEmpty) return;
    if (_teacherId == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Teacher information not available')),
      );
      return;
    }

    final userId = globalParentData?['PARENT']?['_id'];
    if (userId == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('User ID not found')),
      );
      return;
    }

    final success = await _apiService.sendMessage(
      senderId: userId,
      receiverId: _teacherId!, // Send to teacher instead of student
      message: text.trim(),
    );

    if (success) {
      _controller.clear();
      _loadMessages(); // Reload messages to get the new one
    } else {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Failed to send message')),
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
      body: Column(
        children: [
          Expanded(
            child: _isLoading
                ? const Center(child: CircularProgressIndicator())
                : _messages.isEmpty
                    ? const Center(child: Text('No messages yet'))
                    : ListView.builder(
                        reverse: true,
                        padding: const EdgeInsets.all(12),
                        itemCount: _messages.length,
                        itemBuilder: (context, index) {
                          final msg = _messages[_messages.length - 1 - index];
                          return Align(
                            alignment: msg["isMe"]
                                ? Alignment.centerRight
                                : Alignment.centerLeft,
                            child: Container(
                              margin: const EdgeInsets.symmetric(vertical: 4),
                              padding: const EdgeInsets.all(12),
                              decoration: BoxDecoration(
                                color: msg["isMe"]
                                    ? const Color(0xFF7B61FF)
                                    : Colors.grey[300],
                                borderRadius: BorderRadius.circular(15),
                              ),
                              child: Column(
                                crossAxisAlignment: msg["isMe"]
                                    ? CrossAxisAlignment.end
                                    : CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    msg["text"],
                                    style: TextStyle(
                                      color: msg["isMe"]
                                          ? Colors.white
                                          : Colors.black,
                                      fontSize: 16,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    _formatTime(msg["timestamp"]),
                                    style: TextStyle(
                                      color: msg["isMe"]
                                          ? Colors.white70
                                          : Colors.grey[600],
                                      fontSize: 12,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
          ),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.2),
                  spreadRadius: 1,
                  blurRadius: 5,
                ),
              ],
            ),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: InputDecoration(
                      hintText: "Type your message",
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(25),
                        borderSide: BorderSide.none,
                      ),
                      filled: true,
                      fillColor: Colors.grey[100],
                      contentPadding: const EdgeInsets.symmetric(
                        horizontal: 20,
                        vertical: 10,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Container(
                  decoration: const BoxDecoration(
                    color: Color(0xFF7B61FF),
                    shape: BoxShape.circle,
                  ),
                  child: IconButton(
                    onPressed: () => _sendMessage(_controller.text),
                    icon: const Icon(
                      Icons.send,
                      color: Colors.white,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  String _formatTime(DateTime time) {
    return '${time.hour.toString().padLeft(2, '0')}:${time.minute.toString().padLeft(2, '0')}';
  }
}
