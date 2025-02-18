module.exports = {

    isNameValid(name) {
      const trimmedName = name.trim();
      if (!/^[A-Za-zÇçĞğİıÖöŞşÜü\s]+$/.test(trimmedName) || trimmedName.length < 3) {
        throw "İsim en az 3 karakter içermeli ve sadece harflerden oluşmalı (rakam veya özel karakter içermemeli)";
      }
    },
    isSurnameValid(surname) {
      const trimmedSurname = surname.trim();
      if (!/^[A-Za-zÇçĞğİıÖöŞşÜü\s]+$/.test(trimmedSurname) || trimmedSurname.length < 2) {
        throw "Soyisim en az 2 karakter içermeli ve sadece harflerden oluşmalı (rakam veya özel karakter içermemeli)";
      }
    },
    isEmailValid(email) {
      if (!new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email))
        throw "Lütfen geçerli bir e-posta adresi giriniz";
    },
    isPasswordValid(password, minLength = 8, maxLength = 45) {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = new RegExp(
        "^(?=.*[a-zçğıöşü])(?=.*[A-ZÇĞİÖŞÜ])(?=.*\\d)(?=.*[!@#$%^&*()\\-_=+{}[\\]:;<>,.?/~])[a-zA-ZçğıöşüA-ZÇĞİÖŞÜ\\d!@#$%^&*()\\-_=+{}[\\]:;<>,.?/~]{8,45}$"
      ).test(password);
      const isLengthValid =
        password.length >= minLength && password.length <= maxLength;
  
      if (!isLengthValid)
        throw `Şifre en az ${minLength} ve en fazla ${maxLength} karakterden oluşmalıdır.`;
      if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar)
        throw "Şifre en az bir büyük harf, bir küçük harf, bir sayı ve en az bir özel karakter içermelidir.";
    },
    isPasswordCompare(password, rePassword) {
      if (password != rePassword)
        throw "Parolalar uyuşmuyor lütfen kontrol edip daha sonra tekrar deneyiniz!";
    },
    isPhoneNumberValid(phone) {
      let regNumbersOnly = /^[0-9]+$/;
      if (!regNumbersOnly.test(phone)) {
        throw "Lütfen Doğru bir Telefon Numaranızı giriniz !";
      } else if (phone.length !== 10 && phone.length !== 11) {
        throw "Lütfen Doğru bir Telefon Numaranızı giriniz !";
      } else if (phone.length === 11 && phone[0] !== "0") {
        throw "Lütfen Doğru bir Telefon Numaranızı giriniz !";
      } else if (phone.length === 10 && phone[0] !== "5") {
        throw "Lütfen Doğru bir Telefon Numaranızı giriniz !";
      }
    },
    isUsernameValid(username) {
      if (!(username.trim().length >= 3 && username.trim().length <= 30))
        throw "Lütfen doğru bir kullanıcı adı giriniz";
    },
    requiredValid() {
      for (let index = 0; index < arguments.length; index++)
        if (arguments[index].length == 0)
          throw "Lütfen zorunlu alanların tümünü eksiksiz olarak doldurduğunuza emin olun!";
    },
  };
  