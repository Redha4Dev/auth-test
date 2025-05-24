import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:kidergarten/global.dart';
import 'package:kidergarten/main.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  Future<Map<String, dynamic>?> getKidInfo(String name, String id) async {
    final uri = Uri.parse('http://10.0.2.2:5000/admin/manage-kids')
        .replace(queryParameters: {'name': name, 'id': id});

    try {
      final response = await http.get(uri);

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        print('👶 Kid Info: ${data['kid']}');
        return data['kid'];
      } else {
        final error = jsonDecode(response.body);
        print('⚠️ Failed to fetch kid info: ${error['message']}');
      }
    } catch (e) {
      print('❌ Error fetching kid info: $e');
    }
    return null;
  }

  Future<Map<String, dynamic>?> getUserFromToken() async {
    final prefs = await SharedPreferences.getInstance();
    final String? token = prefs.getString('token');
    print('🔍 Retrieved token from SharedPreferences: $token');

    if (token != null && token.isNotEmpty) {
      try {
        Map<String, dynamic> decodedToken = JwtDecoder.decode(token);
        // Assuming your JWT contains 'id' and 'name'
        return {
          'id': decodedToken['id'],
          'name': decodedToken['name'],
        };
      } catch (e) {
        print('Token decoding failed: $e');
        return null;
      }
    } else {
      print('No token found');
      return null;
    }
  }

  Future<void> logoutUser(BuildContext context) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');

    // Navigate to LoginPage and remove all previous routes
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (context) => const MainApp()),
      (route) => false,
    );
  }

  Future<Map<String, dynamic>?> loginUser(String email, String password) async {
    final url = Uri.parse('http://10.0.2.2:5000/login');

    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      // Decode JSON string into a Map
      final Map<String, dynamic> responseData = jsonDecode(response.body);

      // Save the token in shared preferences
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', responseData['token']);

      return responseData;
    } else {
      print('Login failed: ${response.body}');
      return null;
    }
  }

  Future<Map<String, dynamic>?> getParentInfo(String id, String name) async {
    final url = Uri.parse('http://10.0.2.2:5000/parent/profile');

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'id': id,
          'name': name,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        print('✅ Parent found: $data');

        // Store globally
        globalParentData = data;

        // Optional: store persistently
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('parentData', jsonEncode(data));
        data.forEach((key, value) {
          print('$key: $value');
        });

        return data;
      } else {
        final error = jsonDecode(response.body);
        print('⚠️ Error: ${error['message']}');
        return null;
      }
    } catch (e) {
      print('❌ Request failed: $e');
      return null;
    }
  }

  Future<void> createUser({
    required String name,
    required String email,
    required String phone,
    required String role,
    required String gender,
    required String password,
    required String confirmPassword,
    required String school,
    required List<dynamic> kids,
    required String address,
  }) async {
    final url = Uri.parse('http://10.0.2.2:5000/signup');

    final Map<String, dynamic> userData = {
      'name': name,
      'email': email,
      'phone': phone,
      'role': role,
      'gender': gender,
      'password': password,
      'confirmPassword': confirmPassword,
      'school': school,
      'kids': kids,
      'address': address,
    };

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(userData),
      );

      if (response.statusCode == 201 || response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        final String token = responseData['token'];
        print('🔐 Token received: $token');

        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('token', token);
        print('💾 Token saved to SharedPreferences');

        print('User created: \\${response.body}');
      } else {
        print('Failed to create user: \\${response.body}');
      }
    } catch (e) {
      print('Error: $e');
    }
  }

  Future<Map<String, dynamic>> updatePassword({
    required String id,
    required String currentPassword,
    required String newPassword,
    required String confirmNewPassword,
  }) async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');

    final url = Uri.parse('http://10.0.2.2:5000/updatePassword');

    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode({
          'id': id,
          'currentPassword': currentPassword,
          'newPassword': newPassword,
          'confirmNewPassword': confirmNewPassword,
        }),
      );

      final responseData = jsonDecode(response.body);

      if (response.statusCode == 200 && responseData['status'] == 'success') {
        return {
          'success': true,
          'message': responseData['message'],
          'token': responseData['token'],
        };
      } else {
        return {
          'success': false,
          'message': responseData['message'] ?? 'Unknown error occurred',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Exception: $e',
      };
    }
  }

  Future<bool> verifyUserCode({
    required String userId,
    required String code,
  }) async {
    final url = Uri.parse('http://10.0.2.2:5000/verify');
    print('🔵 Starting verification for user: $userId');
    print('🔵 Verification code submitted: $code');
    print('🔵 Sending to URL: $url');

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'id': userId,
          'code': code,
        }),
      );

      print('🔵 Response status code: ${response.statusCode}');
      print('🔵 Response body: ${response.body}');

      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        // Check for backend-specific success indicators
        final success = responseData['success'] ?? false;
        print('🟢 Verification success: $success');
        return success;
      }

      print('🔴 Verification failed with status: ${response.statusCode}');
      return false;
    } catch (e) {
      print('🔥 Error during verification: $e');
      return false;
    }
  }

  Future<bool> getVerificationCode({
    required String userId,
  }) async {
    final url = Uri.parse('http://10.0.2.2:5000/verify');
    print('🔵 Requesting verification code for user: $userId');

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'id': userId,
        }),
      );

      print('🔵 Response status code: ${response.statusCode}');
      print('🔵 Response body: ${response.body}');

      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        // Check for backend-specific success indicators
        final success = responseData['success'] ?? false;
        print('🟢 Verification code sent successfully: $success');
        return success;
      }

      print(
          '🔴 Failed to send verification code with status: ${response.statusCode}');
      return false;
    } catch (e) {
      print('🔥 Error requesting verification code: $e');
      return false;
    }
  }
}
