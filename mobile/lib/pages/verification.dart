import 'package:flutter/material.dart';
import 'package:kidergarten/services/api_service.dart';

class VerifyCodePage extends StatefulWidget {
  final String userId;

  const VerifyCodePage({Key? key, required this.userId}) : super(key: key);

  @override
  State<VerifyCodePage> createState() => _VerifyCodePageState();
}

class _VerifyCodePageState extends State<VerifyCodePage> {
  final TextEditingController codeController = TextEditingController();
  bool isLoading = false;
  bool isRequestingCode = true;
  String? errorMessage;

  @override
  void initState() {
    super.initState();
    _requestVerificationCode();
  }

  Future<void> _requestVerificationCode() async {
    final apiService = ApiService();
    try {
      final success = await apiService.getVerificationCode(
        userId: widget.userId,
      );
      if (!success) {
        setState(() {
          errorMessage = 'Failed to send verification code. Please try again.';
        });
      }
    } catch (e) {
      setState(() {
        errorMessage = 'Error requesting verification code: ${e.toString()}';
      });
    } finally {
      setState(() {
        isRequestingCode = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final apiService = ApiService();

    return Scaffold(
      appBar: AppBar(title: const Text('Verify Your Email')),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: isRequestingCode
            ? const Center(
                child: CircularProgressIndicator(),
              )
            : Column(
                children: [
                  const Text(
                    'Enter the verification code sent to your email',
                    style: TextStyle(fontSize: 16),
                  ),
                  const SizedBox(height: 20),
                  TextField(
                    controller: codeController,
                    decoration: const InputDecoration(
                      labelText: 'Verification Code',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  if (errorMessage != null) ...[
                    const SizedBox(height: 10),
                    Text(errorMessage!,
                        style: const TextStyle(color: Colors.red)),
                  ],
                  const SizedBox(height: 20),
                  isLoading
                      ? const CircularProgressIndicator()
                      : ElevatedButton(
                          child: const Text('Submit'),
                          onPressed: () async {
                            setState(() {
                              isLoading = true;
                              errorMessage = null;
                            });

                            print(
                                '🆔 Attempting verification with user ID: ${widget.userId}');
                            print(
                                '🔢 Using verification code: ${codeController.text.trim()}');

                            try {
                              print('👆🏿trying verification');
                              final success = await apiService.verifyUserCode(
                                userId: widget.userId,
                                code: codeController.text.trim(),
                              );
                              print('verification executed');
                              setState(() => isLoading = false);

                              if (success) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                      content:
                                          Text('Verification successful!')),
                                );
                                Navigator.pushReplacementNamed(
                                    context, '/login');
                              } else {
                                setState(() => errorMessage =
                                    'Invalid code or verification failed. Check your code or request a new one.');
                              }
                            } catch (e) {
                              setState(() {
                                isLoading = false;
                                errorMessage =
                                    'Verification failed: ${e.toString()}';
                              });
                              print('🔥 Verification error: $e');
                            }
                          },
                        ),
                ],
              ),
      ),
    );
  }
}
